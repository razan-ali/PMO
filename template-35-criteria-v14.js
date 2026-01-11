// PETROLUBE 35-CRITERIA FRAMEWORK V14
// Complete input-to-prioritization flow

const PETROLUBE_35_TEMPLATE_V14 = {
    id: 'template-petrolube-35-v14',
    name: 'Petrolube Initiative Dossier - 35 Criteria Framework V14',
    version: '1.0',
    is_published: true,
    created_at: '2025-01-11T00:00:00Z',
    description: 'Complete flow: 35 criteria → 6 dimensions → composite score → tier → rank',

    // Scoring configuration
    scoringConfig: {
        dimensions: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
        scenarios: {
            A: { d1: 0.25, d2: 0.25, d3: 0.15, d4: 0.15, d5: 0.10, d6: 0.10 },
            B: { d1: 0.30, d2: 0.20, d3: 0.15, d4: 0.15, d5: 0.10, d6: 0.10 },
            C: { d1: 0.20, d2: 0.30, d3: 0.15, d4: 0.15, d5: 0.10, d6: 0.10 }
        },
        quadrantModifiers: {
            quick_win: 0.95,
            push_harder: 0.90,
            transformational: 1.00,
            moonshot: 0.85
        }
    },

    fields: [
        // =====================================================================
        // SECTION 1: METADATA (CRITERIA 1-5)
        // =====================================================================
        {
            id: '1',
            key: 'initiative_id',
            label: '1. Initiative ID',
            description: 'Unique identifier: PET (core), NEW (new), REB (rebranding), ECO (ecosystem), HCM (HR)',
            type: 'text',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metadata',
            config: {
                maxLength: 10,
                placeholder: 'PET-006',
                pattern: '^[A-Z]{3}-[A-Z0-9]{1,6}$'
            }
        },
        {
            id: '2',
            key: 'initiative_name',
            label: '2. Initiative Name',
            description: 'Descriptive title (max 200 chars)',
            type: 'text',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metadata',
            config: {
                maxLength: 200,
                placeholder: 'AI Demand Forecasting System'
            }
        },
        {
            id: '3',
            key: 'owner_name',
            label: '3. Owner',
            description: 'Initiative owner responsible for delivery',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metadata',
            config: {
                options: [
                    { value: 'ceo', label: 'CEO: Salman Saadat' },
                    { value: 'cfo', label: 'CFO: John Sliedregt' },
                    { value: 'cito', label: 'CITO: Ghadah Al-Dabbagh' },
                    { value: 'cmo', label: 'Marketing Director: Mian M. Usman' },
                    { value: 'chro', label: 'CHRO' },
                    { value: 'pmo', label: 'PMO Director' }
                ]
            }
        },
        {
            id: '4',
            key: 'strategic_domain',
            label: '4. Strategic Domain',
            description: 'Primary strategic area aligned with Vision 2030',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metadata',
            config: {
                options: [
                    { value: 'core_operations', label: 'Core Operations' },
                    { value: 'business_model', label: 'Business Model Innovation' },
                    { value: 'customer_experience', label: 'Customer Experience' },
                    { value: 'technology_data', label: 'Technology & Data' },
                    { value: 'ecosystem', label: 'Ecosystem & Partnerships' },
                    { value: 'organizational', label: 'Organizational Transformation' }
                ]
            }
        },
        {
            id: '5',
            key: 'portfolio_category',
            label: '5. Portfolio Category',
            description: '60-15-15-10 allocation framework',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metadata',
            config: {
                options: [
                    { value: 'core_incremental', label: 'Core Incremental (60%)' },
                    { value: 'core_disruptive', label: 'Core Disruptive (15%)' },
                    { value: 'non_core_incremental', label: 'Non-Core Incremental (15%)' },
                    { value: 'non_core_disruptive', label: 'Non-Core Disruptive (10%)' }
                ]
            }
        },

        // =====================================================================
        // SECTION 2: STRATEGIC POSITIONING (CRITERIA 6-10)
        // =====================================================================
        {
            id: '6',
            key: 'quadrant',
            label: '6. Quadrant (Auto-calculated from D1/D2)',
            description: 'Impact vs Feasibility Matrix position',
            type: 'dropdown',
            required: false,
            is_scoring: false,
            weight: 0,
            category: 'strategic',
            auto_calculated: true,
            config: {
                options: [
                    { value: 'quick_win', label: 'Quick-Win (D1≥75, D2≥80)' },
                    { value: 'push_harder', label: 'Push-Harder (D1<75, D2≥80)' },
                    { value: 'transformational', label: 'Transformational (D1≥75, D2<80)' },
                    { value: 'moonshot', label: 'Moonshot (D1<75, D2<80)' }
                ]
            }
        },
        {
            id: '7',
            key: 'priority',
            label: '7. Priority',
            description: 'Executive priority classification',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'strategic',
            config: {
                options: [
                    { value: 'critical', label: 'Critical (CEO mandate)' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' }
                ]
            }
        },
        {
            id: '8',
            key: 'tier',
            label: '8. Year 1 Tier',
            description: 'Tier assignment (system suggests based on scores)',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'strategic',
            config: {
                options: [
                    { value: '1a', label: 'Tier 1A: Catastrophic Dependency' },
                    { value: '1b', label: 'Tier 1B: Quick-Win' },
                    { value: '1c', label: 'Tier 1C: Foundation' },
                    { value: '1d', label: 'Tier 1D: Strategic' },
                    { value: '2', label: 'Tier 2: Positioning' },
                    { value: 'contingent', label: 'Contingent' }
                ]
            }
        },
        {
            id: '9',
            key: 'aramco_response',
            label: '9. Aramco Competitive Response',
            description: 'How does this respond to Aramco-Valvoline threat? (feeds D4 scoring)',
            type: 'textarea',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'strategic',
            config: {
                maxLength: 500,
                placeholder: 'Describe defensive and offensive competitive value...'
            }
        },
        {
            id: '10',
            key: 'bcg_i2i_dimensions',
            label: '10. BCG i2i Impact',
            description: 'Select dimensions and expected gain (+points)',
            type: 'multiselect',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'strategic',
            config: {
                options: [
                    { value: 'd1', label: 'D1: Innovation Strategy' },
                    { value: 'd2', label: 'D2: Organization & Decision Making' },
                    { value: 'd3', label: 'D3: Governance & Metrics' },
                    { value: 'd4', label: 'D4: Customer & Market Intelligence' },
                    { value: 'd5', label: 'D5: Portfolio & Performance Mgmt' },
                    { value: 'd6', label: 'D6: Talent & Culture' },
                    { value: 'd7', label: 'D7: Analytics & Insights' },
                    { value: 'd8', label: 'D8: Digital Technology' },
                    { value: 'd9', label: 'D9: Ecosystems & Partnerships' },
                    { value: 'd10', label: 'D10: Results Measurement' }
                ],
                gains: [1, 2, 3, 4, 5, 6]
            }
        },

        // =====================================================================
        // SECTION 3: DIMENSION SCORES (CRITERIA 11-16) - AUTO-CALCULATED
        // =====================================================================
        {
            id: '11',
            key: 'd1_score',
            label: '11. D1: Strategic Impact (Auto-calc)',
            description: 'Calculated from NPV (60%) + Qualitative assessment (40%)',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 25,
            category: 'scoring',
            auto_calculated: true,
            config: { min: 0, max: 100, step: 1, unit: 'points', readonly: true }
        },
        {
            id: '12',
            key: 'd2_score',
            label: '12. D2: Execution Feasibility (Auto-calc)',
            description: 'Calculated from TRL (30%) + Resources (25%) + Timeline (25%) + Dependencies (20%)',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 25,
            category: 'scoring',
            auto_calculated: true,
            config: { min: 0, max: 100, step: 1, unit: 'points', readonly: true }
        },
        {
            id: '13',
            key: 'd3_score',
            label: '13. D3: BCG i2i Advancement (Auto-calc)',
            description: 'Calculated from selected dimensions × expected gains',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 20,
            category: 'scoring',
            auto_calculated: true,
            config: { min: 0, max: 100, step: 1, unit: 'points', readonly: true }
        },
        {
            id: '14',
            key: 'd4_score',
            label: '14. D4: Aramco Response (AI-suggested)',
            description: 'AI analyzes competitive response text, human validates',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 15,
            category: 'scoring',
            ai_suggested: true,
            config: { min: 0, max: 100, step: 1, unit: 'points' }
        },
        {
            id: '15',
            key: 'd5_score',
            label: '15. D5: MiRA Integration (Auto-calc)',
            description: 'Calculated from MiRA layer + integration depth',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 10,
            category: 'scoring',
            auto_calculated: true,
            config: { min: 0, max: 100, step: 1, unit: 'points', readonly: true }
        },
        {
            id: '16',
            key: 'd6_score',
            label: '16. D6: Three Engines Alignment (Auto-calc)',
            description: 'Calculated from engine contribution + portfolio balance + coherence',
            type: 'number',
            required: false,
            is_scoring: true,
            weight: 10,
            category: 'scoring',
            auto_calculated: true,
            config: { min: 0, max: 100, step: 1, unit: 'points', readonly: true }
        },

        // =====================================================================
        // SECTION 4: BUSINESS CASE (CRITERIA 17-23)
        // =====================================================================
        {
            id: '17',
            key: 'problem_statement',
            label: '17. Problem Statement',
            description: 'Clear description of current state pain (feeds D1)',
            type: 'textarea',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxLength: 1000,
                placeholder: 'Describe the problem, quantify the pain...'
            }
        },
        {
            id: '18',
            key: 'solution_description',
            label: '18. Solution Description',
            description: 'How the solution works (feeds D2)',
            type: 'textarea',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxLength: 1500,
                placeholder: 'Explain the solution approach and methodology...'
            }
        },
        {
            id: '19',
            key: 'financial_projections',
            label: '19. Financial Projections',
            description: 'Year-by-year cash flows (feeds D1 quantitative)',
            type: 'financial_table',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                years: [0, 1, 2, 3, 4, 5],
                calculate_npv: true,
                wacc: 0.12
            }
        },
        {
            id: '20',
            key: 'roi_analysis',
            label: '20. ROI Analysis',
            description: 'Benefit breakdown by category',
            type: 'benefit_table',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxCategories: 5
            }
        },
        {
            id: '21',
            key: 'stakeholder_impact',
            label: '21. Stakeholder Impact',
            description: 'Impact by stakeholder group (feeds D1 qualitative)',
            type: 'text',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxLength: 600,
                placeholder: 'CEO impact, CFO impact, Customer impact, Employee impact...'
            }
        },
        {
            id: '22',
            key: 'competitive_analysis',
            label: '22. Competitive Analysis',
            description: 'Competitive positioning (feeds D4)',
            type: 'textarea',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxLength: 800,
                placeholder: 'What competitors lack, our advantage, time to replicate...'
            }
        },
        {
            id: '23',
            key: 'strategic_rationale',
            label: '23. Strategic Rationale',
            description: 'Why now, why important (feeds D6)',
            type: 'textarea',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'business_case',
            config: {
                maxLength: 600,
                placeholder: 'Why strategically important, why now, what if we don\'t...'
            }
        },

        // =====================================================================
        // SECTION 5: IMPLEMENTATION (CRITERIA 24-27)
        // =====================================================================
        {
            id: '24',
            key: 'trl_level',
            label: '24. Technology Readiness Level (TRL)',
            description: 'TRL 1-9 (feeds D2 - 30% weight)',
            type: 'dropdown',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'implementation',
            config: {
                options: [
                    { value: 9, label: 'TRL 9: Proven in operational environment', score: 95 },
                    { value: 8, label: 'TRL 8: System complete and qualified', score: 90 },
                    { value: 7, label: 'TRL 7: System prototype in operation', score: 85 },
                    { value: 6, label: 'TRL 6: System model in relevant environment', score: 80 },
                    { value: 5, label: 'TRL 5: Component validation', score: 75 },
                    { value: 4, label: 'TRL 4: Component validation in lab', score: 65 },
                    { value: 3, label: 'TRL 3: Proof of concept', score: 60 },
                    { value: 2, label: 'TRL 2: Technology concept formulated', score: 55 },
                    { value: 1, label: 'TRL 1: Basic principles observed', score: 50 }
                ]
            }
        },
        {
            id: '25',
            key: 'resource_availability',
            label: '25. Resource Availability',
            description: 'Team, budget, sponsor, skills (feeds D2 - 25% weight)',
            type: 'checklist',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'implementation',
            config: {
                options: [
                    { value: 'team', label: 'Team assigned' },
                    { value: 'budget', label: 'Budget confirmed' },
                    { value: 'sponsor', label: 'Executive sponsor identified' },
                    { value: 'skills', label: 'Required skills available' }
                ]
            }
        },
        {
            id: '26',
            key: 'timeline',
            label: '26. Timeline',
            description: 'Start date, end date, confidence (feeds D2 - 25% weight)',
            type: 'timeline',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'implementation',
            config: {
                fields: ['start_date', 'end_date', 'confidence']
            }
        },
        {
            id: '27',
            key: 'mira_integration',
            label: '27. MiRA Integration',
            description: 'MiRA layer and integration depth (feeds D5)',
            type: 'mira_config',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'implementation',
            config: {
                layers: [
                    { value: 0, label: 'No MiRA use', score: 0 },
                    { value: 1, label: 'Layer 1: Basic reporting', score: 30 },
                    { value: 2, label: 'Layer 2: Data lake/analytics', score: 50 },
                    { value: 3, label: 'Layer 3: ML/AI models', score: 70 },
                    { value: 4, label: 'Layer 4: API/ecosystem monetization', score: 90 }
                ],
                depth: ['low', 'medium', 'high']
            }
        },

        // =====================================================================
        // SECTION 6: DEPENDENCIES (CRITERIA 28-30)
        // =====================================================================
        {
            id: '28',
            key: 'prerequisites',
            label: '28. Prerequisites',
            description: 'Critical dependencies that must complete first (feeds D2 - 20% weight)',
            type: 'dependency_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'dependencies',
            config: {
                fields: ['type', 'name', 'criticality', 'due_date', 'status']
            }
        },
        {
            id: '29',
            key: 'enablers',
            label: '29. Enablers',
            description: 'Capabilities that enable this initiative',
            type: 'enabler_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'dependencies',
            config: {
                types: ['Technology', 'Data', 'Process', 'Capability']
            }
        },
        {
            id: '30',
            key: 'integration_points',
            label: '30. Integration Points',
            description: 'Systems/platforms requiring integration',
            type: 'integration_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'dependencies',
            config: {
                systems: ['Oracle', 'MiRA', 'SAP', 'Custom']
            }
        },

        // =====================================================================
        // SECTION 7: RAID (CRITERIA 31-34)
        // =====================================================================
        {
            id: '31',
            key: 'risks',
            label: '31. Risks',
            description: 'Risk register with 5×5 matrix (impacts D2)',
            type: 'risk_matrix',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'raid',
            config: {
                minRisks: 3,
                probability: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
                impact: ['Negligible', 'Low', 'Medium', 'High', 'Catastrophic']
            }
        },
        {
            id: '32',
            key: 'assumptions',
            label: '32. Assumptions',
            description: 'Key assumptions requiring validation (impacts D2)',
            type: 'assumption_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'raid',
            config: {
                minAssumptions: 3,
                categories: ['Market', 'Technology', 'Resource', 'Financial', 'Regulatory']
            }
        },
        {
            id: '33',
            key: 'issues',
            label: '33. Issues',
            description: 'Current blockers requiring resolution',
            type: 'issue_list',
            required: false,
            is_scoring: false,
            weight: 0,
            category: 'raid',
            config: {
                severity: ['Critical', 'High', 'Medium', 'Low']
            }
        },
        {
            id: '34',
            key: 'dependency_count',
            label: '34. Total Critical Dependencies',
            description: 'Count of critical dependencies (auto-calc from #28)',
            type: 'number',
            required: false,
            is_scoring: false,
            weight: 0,
            category: 'raid',
            auto_calculated: true,
            config: { readonly: true }
        },

        // =====================================================================
        // SECTION 8: METRICS (CRITERIA 35-37)
        // =====================================================================
        {
            id: '35',
            key: 'success_criteria',
            label: '35. Success Criteria',
            description: 'SMART measurable success definitions (min 3)',
            type: 'criteria_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metrics',
            config: {
                minCriteria: 3,
                fields: ['metric', 'baseline', 'target', 'timeframe', 'method']
            }
        },
        {
            id: '36',
            key: 'kpis',
            label: '36. KPIs',
            description: 'Key Performance Indicators with thresholds (min 3)',
            type: 'kpi_list',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metrics',
            config: {
                minKPIs: 3,
                categories: ['Financial', 'Operational', 'Customer', 'Employee', 'Strategic'],
                frequency: ['Daily', 'Weekly', 'Monthly', 'Quarterly']
            }
        },
        {
            id: '37',
            key: 'governance',
            label: '37. Governance',
            description: 'Reporting structure and review cadence',
            type: 'governance_config',
            required: true,
            is_scoring: false,
            weight: 0,
            category: 'metrics',
            config: {
                sponsors: ['CEO', 'CFO', 'CITO', 'Other'],
                reporting: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'],
                gates: ['Gate 0', 'Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5']
            }
        }
    ]
};
