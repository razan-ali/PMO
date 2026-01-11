// ============================================================================
// 6-DIMENSION SCORING CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate D1: Strategic Impact Score (0-100)
 * Components: NPV-based Quantitative (60%) + Qualitative Assessment (40%)
 */
function calculateD1Score(criteriaValues, allInitiatives) {
    // Quantitative Component (60% weight) - from Financial Projections
    const npv = calculateNPV(criteriaValues.financial_projections);
    let quantScore = 0;

    if (npv > 100000000) quantScore = 95;
    else if (npv > 50000000) quantScore = 85;
    else if (npv > 20000000) quantScore = 75;
    else if (npv > 5000000) quantScore = 65;
    else quantScore = 55;

    // Qualitative Component (40% weight) - from Problem, Stakeholder, Strategic Rationale
    let qualScore = 0;

    // Analyze problem severity
    const problemText = (criteriaValues.problem_statement || '').toLowerCase();
    if (problemText.includes('sar') || problemText.includes('million')) qualScore += 3;
    if (problemText.includes('critical') || problemText.includes('urgent')) qualScore += 2;

    // Analyze stakeholder impact
    const stakeholderText = (criteriaValues.stakeholder_impact || '').toLowerCase();
    if (stakeholderText.includes('ceo') || stakeholderText.includes('executive')) qualScore += 2;
    if (stakeholderText.includes('customer')) qualScore += 2;

    // Strategic alignment
    const strategicText = (criteriaValues.strategic_rationale || '').toLowerCase();
    if (strategicText.includes('vision') || strategicText.includes('strategy')) qualScore += 1;

    // Combine: 60% quantitative + 40% qualitative
    const d1 = Math.round((quantScore * 0.6) + (qualScore * 4));
    return Math.min(100, Math.max(0, d1));
}

/**
 * Calculate D2: Execution Feasibility Score (0-100)
 * Components: TRL (30%) + Resources (25%) + Timeline (25%) + Dependencies (20%)
 */
function calculateD2Score(criteriaValues) {
    // TRL Component (30% weight)
    const trlOptions = {
        9: 95, 8: 90, 7: 85, 6: 80, 5: 75,
        4: 65, 3: 60, 2: 55, 1: 50
    };
    const trlScore = (trlOptions[criteriaValues.trl_level] || 70) * 0.30;

    // Resource Availability Component (25% weight)
    const resources = criteriaValues.resource_availability || [];
    const resourceScore = (resources.length / 4) * 100 * 0.25;

    // Timeline Confidence Component (25% weight)
    const timeline = criteriaValues.timeline || {};
    const duration = calculateMonthsDuration(timeline.start_date, timeline.end_date);
    let timelineScore = 70;

    if (duration <= 4 && timeline.confidence === 'high') timelineScore = 90;
    else if (duration <= 6 && timeline.confidence !== 'low') timelineScore = 80;
    else if (duration <= 12 && timeline.confidence !== 'low') timelineScore = 70;
    else timelineScore = 60;

    timelineScore *= 0.25;

    // Dependency Complexity Component (20% weight)
    const criticalDeps = (criteriaValues.prerequisites || []).filter(p => p.criticality === 'Critical').length;
    const totalDeps = (criteriaValues.prerequisites || []).length;
    let depScore = 90;

    if (criticalDeps === 0 && totalDeps <= 3) depScore = 90;
    else if (criticalDeps === 0 && totalDeps <= 5) depScore = 80;
    else if (criticalDeps === 1) depScore = 70;
    else if (criticalDeps === 2) depScore = 60;
    else depScore = 50;

    depScore *= 0.20;

    const d2 = Math.round(trlScore + resourceScore + timelineScore + depScore);
    return Math.min(100, Math.max(0, d2));
}

/**
 * Calculate D3: BCG i2i Advancement Score (0-100)
 * Based on number of dimensions × expected gain
 */
function calculateD3Score(criteriaValues) {
    const dimensions = criteriaValues.bcg_i2i_dimensions || [];
    if (dimensions.length === 0) return 0;

    // Base score: number of dimensions × 10
    const baseScore = dimensions.length * 10;

    // Calculate average expected gain
    const avgGain = dimensions.reduce((sum, dim) => sum + (dim.gain || 3), 0) / dimensions.length;
    const gainPoints = avgGain * 5;

    // Breadth bonus
    let breadthBonus = 0;
    if (dimensions.length >= 7) breadthBonus = 20;
    else if (dimensions.length >= 5) breadthBonus = 10;

    const d3 = Math.round(baseScore + gainPoints + breadthBonus);
    return Math.min(100, Math.max(0, d3));
}

/**
 * Calculate D4: Aramco Competitive Response Score (0-100)
 * AI-suggested from competitive analysis text, human validates
 */
function calculateD4Score(criteriaValues) {
    // This would use AI analysis in production
    // For now, use keyword-based scoring

    const aramcoText = (criteriaValues.aramco_response || '').toLowerCase();
    const compText = (criteriaValues.competitive_analysis || '').toLowerCase();
    const combinedText = aramcoText + ' ' + compText;

    let defensiveScore = 50;
    let offensiveScore = 50;

    // Defensive keywords
    if (combinedText.includes('protect') || combinedText.includes('retain')) defensiveScore += 10;
    if (combinedText.includes('defend') || combinedText.includes('prevent')) defensiveScore += 10;
    if (combinedText.includes('customer retention') || combinedText.includes('loyalty')) defensiveScore += 10;
    if (combinedText.includes('switching cost')) defensiveScore += 10;

    // Offensive keywords
    if (combinedText.includes('lead') || combinedText.includes('first-mover')) offensiveScore += 10;
    if (combinedText.includes('cannot replicate') || combinedText.includes('unique')) offensiveScore += 10;
    if (combinedText.includes('capability gap') || combinedText.includes('advantage')) offensiveScore += 10;
    if (combinedText.includes('mira') || combinedText.includes('data')) offensiveScore += 10;

    // Time to replicate modifier
    if (combinedText.includes('36 month') || combinedText.includes('3 year')) offensiveScore += 10;
    else if (combinedText.includes('24 month') || combinedText.includes('2 year')) offensiveScore += 5;

    const d4 = Math.round((Math.min(100, defensiveScore) + Math.min(100, offensiveScore)) / 2);
    return Math.min(100, Math.max(0, d4));
}

/**
 * Calculate D5: MiRA Integration Potential Score (0-100)
 * Based on MiRA layer + integration depth
 */
function calculateD5Score(criteriaValues) {
    const miraConfig = criteriaValues.mira_integration || {};

    if (!miraConfig.layer || miraConfig.layer === 0) return 0;

    // Base score from layer
    const layerScores = { 0: 0, 1: 30, 2: 50, 3: 70, 4: 90 };
    let baseScore = layerScores[miraConfig.layer] || 0;

    // Depth modifier
    const depthModifiers = { 'low': -10, 'medium': 0, 'high': 10 };
    const depthMod = depthModifiers[miraConfig.depth] || 0;

    // Multi-layer bonus
    const multiLayerBonus = miraConfig.multiple_layers ? 5 : 0;

    // Monetization clarity (for Layer 4)
    let monetizationMod = 0;
    if (miraConfig.layer === 4) {
        if (miraConfig.monetization_clarity === 'yes') monetizationMod = 0;
        else if (miraConfig.monetization_clarity === 'partial') monetizationMod = -10;
        else monetizationMod = -20;
    }

    const d5 = Math.round(baseScore + depthMod + multiLayerBonus + monetizationMod);
    return Math.min(100, Math.max(0, d5));
}

/**
 * Calculate D6: Three Engines Alignment Score (0-100)
 * Components: Engine Contribution (40%) + Portfolio Balance (35%) + Strategic Coherence (25%)
 */
function calculateD6Score(criteriaValues, allInitiatives) {
    // Engine Contribution (40% weight)
    const engineStrengthScores = {
        'critical': 95,
        'strong': 85,
        'solid': 75,
        'moderate': 65,
        'weak': 55
    };
    const contributionScore = (engineStrengthScores[criteriaValues.engine_contribution_strength] || 70) * 0.40;

    // Portfolio Balance (35% weight)
    const targetDistribution = { e1_sustain_grow: 0.60, e2_expand_inorganically: 0.25, e3_base_oil_integration: 0.15 };
    const currentEngine = criteriaValues.three_engines_alignment || 'e1_sustain_grow';

    // Calculate current distribution
    const engineCounts = { e1_sustain_grow: 0, e2_expand_inorganically: 0, e3_base_oil_integration: 0 };
    allInitiatives.forEach(init => {
        const engine = init.criteriaValues?.three_engines_alignment || 'e1_sustain_grow';
        if (engineCounts[engine] !== undefined) engineCounts[engine]++;
    });

    const total = allInitiatives.length;
    const currentPct = engineCounts[currentEngine] / total;
    const targetPct = targetDistribution[currentEngine];
    const gap = targetPct - currentPct;

    let balanceScore = 70;
    if (gap > 0) balanceScore = 85 + Math.min(gap * 100, 15); // Under-allocated, adding helps
    else balanceScore = 70 - Math.min(Math.abs(gap) * 100, 20); // Over-allocated

    balanceScore *= 0.35;

    // Strategic Coherence (25% weight)
    const coherence = criteriaValues.strategic_coherence || {};
    let coherenceChecks = 0;
    if (coherence.ceo_priority) coherenceChecks++;
    if (coherence.aramco_address) coherenceChecks++;
    if (coherence.bcg_i2i) coherenceChecks++;
    if (coherence.vision_fit) coherenceChecks++;

    const coherenceScore = (coherenceChecks / 4) * 100 * 0.25;

    const d6 = Math.round(contributionScore + balanceScore + coherenceScore);
    return Math.min(100, Math.max(0, d6));
}

/**
 * Calculate NPV from financial projections
 */
function calculateNPV(financialData) {
    if (!financialData || !financialData.years) return 0;

    const wacc = financialData.wacc || 0.12;
    const years = financialData.years || {};

    let npv = 0;
    Object.keys(years).forEach(year => {
        const yearNum = parseInt(year);
        const cashFlow = years[year] || 0;
        npv += cashFlow / Math.pow(1 + wacc, yearNum);
    });

    return npv;
}

/**
 * Calculate months between two dates
 */
function calculateMonthsDuration(startDate, endDate) {
    if (!startDate || !endDate) return 12;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(1, months);
}

/**
 * Calculate composite score from 6 dimensions
 */
function calculateCompositeScore(scores, scenario = 'A') {
    const weights = PETROLUBE_35_TEMPLATE.scoringConfig.scenarios[scenario];

    const composite =
        (scores.d1 || 0) * weights.d1 +
        (scores.d2 || 0) * weights.d2 +
        (scores.d3 || 0) * weights.d3 +
        (scores.d4 || 0) * weights.d4 +
        (scores.d5 || 0) * weights.d5 +
        (scores.d6 || 0) * weights.d6;

    return Math.round(composite * 10) / 10; // Round to 1 decimal
}

/**
 * Assign quadrant based on D1 and D2 scores
 */
function assignQuadrant(d1, d2) {
    if (d1 >= 75 && d2 >= 80) return 'quick_win';
    if (d1 < 75 && d2 >= 80) return 'push_harder';
    if (d1 >= 75 && d2 < 80) return 'transformational';
    return 'moonshot';
}

/**
 * Calculate final score with quadrant modifier
 */
function calculateFinalScore(compositeScore, quadrant) {
    const modifier = PETROLUBE_35_TEMPLATE.scoringConfig.quadrantModifiers[quadrant] || 1.0;
    return Math.round(compositeScore * modifier * 10) / 10;
}

/**
 * Assign tier based on scores and characteristics
 */
function assignTier(criteriaValues, finalScore, allInitiatives) {
    // Check for catastrophic dependencies
    const criticalDeps = (criteriaValues.prerequisites || []).filter(p => p.criticality === 'Critical').length;
    if (criticalDeps >= 3) return '1a';

    // Priority-based tier assignment
    if (criteriaValues.priority === 'critical') {
        if (finalScore >= 80) return '1a';
        return '1b';
    }

    // Score-based tier assignment
    if (finalScore >= 80) return '1b';
    if (finalScore >= 70) return '1c';
    if (finalScore >= 60) return '1d';
    if (finalScore >= 50) return '2';
    return 'contingent';
}

/**
 * Validate portfolio balance
 */
function validatePortfolioBalance(allInitiatives) {
    const categoryCounts = {
        core_incremental: 0,
        core_disruptive: 0,
        non_core_incremental: 0,
        non_core_disruptive: 0
    };

    const engineCounts = {
        e1_sustain_grow: 0,
        e2_expand_inorganically: 0,
        e3_base_oil_integration: 0
    };

    allInitiatives.forEach(init => {
        const cat = init.criteriaValues?.portfolio_category;
        const eng = init.criteriaValues?.three_engines_alignment;

        if (categoryCounts[cat] !== undefined) categoryCounts[cat]++;
        if (engineCounts[eng] !== undefined) engineCounts[eng]++;
    });

    const total = allInitiatives.length;

    // Calculate percentages
    const categoryPct = {
        core_incremental: (categoryCounts.core_incremental / total) * 100,
        core_disruptive: (categoryCounts.core_disruptive / total) * 100,
        non_core_incremental: (categoryCounts.non_core_incremental / total) * 100,
        non_core_disruptive: (categoryCounts.non_core_disruptive / total) * 100
    };

    const enginePct = {
        e1_sustain_grow: (engineCounts.e1_sustain_grow / total) * 100,
        e2_expand_inorganically: (engineCounts.e2_expand_inorganically / total) * 100,
        e3_base_oil_integration: (engineCounts.e3_base_oil_integration / total) * 100
    };

    // Validate against targets
    const validation = {
        category: {
            core_incremental: { actual: categoryPct.core_incremental, target: 60, inRange: categoryPct.core_incremental >= 58 && categoryPct.core_incremental <= 62 },
            core_disruptive: { actual: categoryPct.core_disruptive, target: 15, inRange: categoryPct.core_disruptive >= 13 && categoryPct.core_disruptive <= 17 },
            non_core_incremental: { actual: categoryPct.non_core_incremental, target: 15, inRange: categoryPct.non_core_incremental >= 13 && categoryPct.non_core_incremental <= 17 },
            non_core_disruptive: { actual: categoryPct.non_core_disruptive, target: 10, inRange: categoryPct.non_core_disruptive >= 8 && categoryPct.non_core_disruptive <= 12 }
        },
        engine: {
            e1_sustain_grow: { actual: enginePct.e1_sustain_grow, target: 60, inRange: enginePct.e1_sustain_grow >= 58 && enginePct.e1_sustain_grow <= 62 },
            e2_expand_inorganically: { actual: enginePct.e2_expand_inorganically, target: 25, inRange: enginePct.e2_expand_inorganically >= 23 && enginePct.e2_expand_inorganically <= 27 },
            e3_base_oil_integration: { actual: enginePct.e3_base_oil_integration, target: 15, inRange: enginePct.e3_base_oil_integration >= 13 && enginePct.e3_base_oil_integration <= 17 }
        }
    };

    return validation;
}
