import type { DiagnosisNode, DiagnosisEdge } from '../types';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Enhanced function calling schema for comprehensive medical reasoning
const DIAGNOSIS_SCHEMA = {
  name: 'generate_comprehensive_diagnosis_workflow',
  description: 'Analyze clinical note and generate comprehensive diagnosis workflow with multiple nodes and detailed medical reasoning',
  parameters: {
    type: 'object',
    properties: {
      primary_diagnoses: {
        type: 'array',
        description: 'Most likely primary diagnoses based on clinical findings',
        minItems: 1,
        maxItems: 3,
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            label: { type: 'string', description: 'Diagnosis name' },
            type: { type: 'string', enum: ['diagnosis'], description: 'Node type' },
            confidence: { type: 'number', minimum: 0.7, maximum: 1, description: 'High confidence score 0.7-1' },
            evidence: { 
              type: 'array', 
              items: { type: 'string' }, 
              description: 'Supporting clinical findings from the note',
              minItems: 2
            },
            details: { type: 'string', description: 'Clinical reasoning and pathophysiology' }
          },
          required: ['id', 'label', 'type', 'confidence', 'evidence', 'details']
        }
      },
      differential_diagnoses: {
        type: 'array',
        description: 'Alternative diagnoses to consider - must have at least 2-4 differentials',
        minItems: 2,
        maxItems: 5,
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            label: { type: 'string', description: 'Differential diagnosis name' },
            type: { type: 'string', enum: ['differential'], description: 'Node type' },
            confidence: { type: 'number', minimum: 0.2, maximum: 0.8, description: 'Lower confidence score' },
            evidence: { 
              type: 'array', 
              items: { type: 'string' }, 
              description: 'Supporting or concerning findings' 
            },
            details: { type: 'string', description: 'Why this should be considered' }
          },
          required: ['id', 'label', 'type', 'confidence', 'details']
        }
      },
      immediate_actions: {
        type: 'array',
        description: 'Urgent actions needed immediately - critical tests, treatments, monitoring',
        minItems: 1,
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            label: { type: 'string', description: 'Immediate action description' },
            type: { type: 'string', enum: ['action'], description: 'Node type' },
            priority: { type: 'string', enum: ['urgent', 'high'], description: 'High priority only' },
            details: { type: 'string', description: 'Why this action is needed immediately' },
            category: { type: 'string', enum: ['diagnostic', 'therapeutic', 'monitoring'], description: 'Action category' }
          },
          required: ['id', 'label', 'type', 'priority', 'details', 'category']
        }
      },
      followup_actions: {
        type: 'array',
        description: 'Additional tests, consultations, treatments for comprehensive workup',
        minItems: 3,
        maxItems: 8,
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            label: { type: 'string', description: 'Follow-up action description' },
            type: { type: 'string', enum: ['action'], description: 'Node type' },
            priority: { type: 'string', enum: ['medium', 'low'], description: 'Lower priority actions' },
            details: { type: 'string', description: 'Rationale and expected information' },
            category: { type: 'string', enum: ['diagnostic', 'therapeutic', 'monitoring', 'consultation'], description: 'Action category' },
            timing: { type: 'string', description: 'When this should be done (e.g., within 24h, outpatient, etc.)' }
          },
          required: ['id', 'label', 'type', 'priority', 'details', 'category']
        }
      },
      relationships: {
        type: 'array',
        description: 'Clinical relationships between diagnoses and actions - create comprehensive connections',
        minItems: 5,
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique edge identifier' },
            source: { type: 'string', description: 'Source node ID' },
            target: { type: 'string', description: 'Target node ID' },
            relationship: { 
              type: 'string', 
              enum: ['confirms', 'rules-out', 'monitors', 'treats', 'investigates'],
              description: 'Clinical relationship type' 
            },
            label: { type: 'string', description: 'Brief relationship description' },
            strength: { type: 'string', enum: ['strong', 'moderate', 'weak'], description: 'Relationship strength' }
          },
          required: ['id', 'source', 'target', 'relationship', 'label']
        }
      }
    },
    required: ['primary_diagnoses', 'differential_diagnoses', 'immediate_actions', 'followup_actions', 'relationships']
  }
};

export interface OpenAIResponse {
  nodes: DiagnosisNode[];
  edges: DiagnosisEdge[];
}

export async function analyzeWithOpenAI(clinicalNote: string, apiKey: string): Promise<OpenAIResponse> {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  if (!clinicalNote.trim()) {
    throw new Error('Clinical note cannot be empty');
  }

  const systemPrompt = `You are an expert emergency medicine physician and clinical decision support system with deep medical knowledge. 

Your task is to analyze clinical presentations and create comprehensive diagnostic workflows that would be used in real clinical practice.

CRITICAL REQUIREMENTS:
1. Generate AT LEAST 6-10 total nodes (diagnoses + actions combined)
2. Include 1-3 primary diagnoses with high confidence
3. Include 2-5 differential diagnoses to consider
4. Include 1-4 immediate/urgent actions
5. Include 3-8 follow-up actions for comprehensive care
6. Create meaningful clinical relationships between all nodes

MEDICAL REASONING APPROACH:
- Consider epidemiology, clinical presentation patterns
- Think about life-threatening conditions first
- Include both common and serious diagnoses
- Consider diagnostic tests that would differentiate between possibilities
- Include both diagnostic and therapeutic interventions
- Think about monitoring needs and follow-up care
- Consider specialist consultations when appropriate

WORKFLOW STRUCTURE:
- Primary diagnoses should have confidence > 0.7
- Differentials should have confidence 0.2-0.8
- Immediate actions should be urgent/high priority
- Follow-up actions should be medium/low priority
- Create logical clinical relationships between diagnoses and actions`;

  const userPrompt = `Clinical Presentation: ${clinicalNote}

Generate a comprehensive diagnostic workflow for this patient that includes:

1. PRIMARY DIAGNOSES (1-3): Most likely conditions based on the presentation
2. DIFFERENTIAL DIAGNOSES (2-5): Important alternative diagnoses to consider
3. IMMEDIATE ACTIONS (1-4): Urgent tests, treatments, or interventions needed now
4. FOLLOW-UP ACTIONS (3-8): Additional workup, consultations, treatments for comprehensive care
5. CLINICAL RELATIONSHIPS: How each diagnosis connects to specific actions

Think like an experienced clinician seeing this patient in the emergency department or clinic. What would be your complete diagnostic and management approach?

IMPORTANT: Generate a substantial workflow with multiple nodes - this should reflect real clinical complexity, not oversimplified reasoning.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'o3',  // Updated to use full o3 reasoning model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [{
          type: 'function',
          function: DIAGNOSIS_SCHEMA
        }],
        tool_choice: { type: 'function', function: { name: 'generate_comprehensive_diagnosis_workflow' } },
        max_completion_tokens: 4000   // Updated parameter name for reasoning models
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
      throw new Error('Invalid response format from OpenAI');
    }

    const functionResponse = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
    
    // Create clustered layout based on medical relationships
    const createClusteredLayout = () => {
      const clusters: { [key: string]: { x: number; y: number; nodes: any[] } } = {};
      const relationships = functionResponse.relationships || [];
      
      // Initialize clusters for primary diagnoses
      functionResponse.primary_diagnoses.forEach((dx: any, index: number) => {
        clusters[dx.id] = {
          x: 100 + (index * 600), // Wider cluster spacing for larger nodes
          y: 50,
          nodes: [dx]
        };
      });
      
      // Add related actions to diagnosis clusters
      const allActions = [...functionResponse.immediate_actions, ...functionResponse.followup_actions];
      
      allActions.forEach((action: any) => {
        // Find related diagnosis
        const relatedDx = relationships.find((rel: any) => 
          rel.source === action.id || rel.target === action.id
        );
        
        if (relatedDx) {
          const diagnosisId = relatedDx.source === action.id ? relatedDx.target : relatedDx.source;
          const cluster = clusters[diagnosisId];
          
          if (cluster) {
            cluster.nodes.push(action);
          } else {
            // Create new cluster for orphaned actions
            const clusterIndex = Object.keys(clusters).length;
            clusters[action.id] = {
              x: 100 + (clusterIndex * 600),
              y: 50,
              nodes: [action]
            };
          }
        } else {
          // Create new cluster for unrelated actions
          const clusterIndex = Object.keys(clusters).length;
          clusters[action.id] = {
            x: 100 + (clusterIndex * 600),
            y: 50,
            nodes: [action]
          };
        }
      });
      
      // Add differential diagnoses to existing clusters or create new ones
      functionResponse.differential_diagnoses.forEach((dx: any) => {
        // Try to find related primary diagnosis
        const relatedPrimary = Object.keys(clusters).find(clusterId => {
          const cluster = clusters[clusterId];
          return cluster.nodes.some(node => node.type === 'diagnosis');
        });
        
        if (relatedPrimary && clusters[relatedPrimary].nodes.length < 4) {
          clusters[relatedPrimary].nodes.push(dx);
        } else {
          // Create new cluster
          const clusterIndex = Object.keys(clusters).length;
          clusters[dx.id] = {
            x: 100 + (clusterIndex * 600),
            y: 50,
            nodes: [dx]
          };
        }
      });
      
      return clusters;
    };
    
    const clusters = createClusteredLayout();
    
    // Convert clusters to positioned nodes
    const nodes: DiagnosisNode[] = [];
    
    Object.values(clusters).forEach((cluster) => {
      cluster.nodes.forEach((node: any, index: number) => {
        const nodeData = {
          id: node.id,
          type: 'default',
          position: {
            x: cluster.x + (index % 2) * 500, // Wider spacing for larger nodes
            y: cluster.y + Math.floor(index / 2) * 250 // More vertical spacing for larger nodes
          },
          data: {
            label: node.label,
            type: node.type,
            confidence: node.confidence,
            evidence: node.evidence,
            details: node.details,
            priority: node.priority,
            category: node.category,
            timing: node.timing
          }
        };
        nodes.push(nodeData);
      });
    });

    const edges: DiagnosisEdge[] = functionResponse.relationships.map((rel: any) => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      label: rel.label,
      type: rel.relationship
    }));

    console.log(`Generated ${nodes.length} nodes and ${edges.length} edges`);
    return { nodes, edges };

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to analyze clinical note with OpenAI');
  }
}