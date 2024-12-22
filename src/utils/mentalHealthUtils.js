// Crisis keywords that might indicate someone needs immediate help
const CRISIS_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'want to die',
  'hurt myself',
  'self harm',
];

// Emergency resources
const EMERGENCY_RESOURCES = {
  global: {
    name: 'Emergency Services',
    number: '911 (US) / 112 (EU)',
    description: 'For immediate emergency assistance'
  },
  us: {
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: '24/7, free and confidential support'
  },
  uk: {
    name: 'Samaritans',
    number: '116 123',
    description: '24/7, free and confidential support'
  }
};

// Check if message contains crisis keywords
export const checkForCrisisKeywords = (message) => {
  const lowercaseMessage = message.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowercaseMessage.includes(keyword));
};

// Get emergency resources message
export const getEmergencyResourcesMessage = () => {
  return `If you're in immediate danger, please contact emergency services:

${Object.values(EMERGENCY_RESOURCES)
    .map(resource => `${resource.name}: ${resource.number}\n${resource.description}`)
    .join('\n\n')}`;
};

// Format bot response for better readability
export const formatBotResponse = (response) => {
  // Add line breaks for readability
  return response.replace(/([.!?])\s+/g, '$1\n\n');
};

// Check if message indicates user needs professional help
export const checkNeedsProfessionalHelp = (message) => {
  const professionalHelpKeywords = [
    'therapy',
    'therapist',
    'counseling',
    'counselor',
    'psychiatrist',
    'psychologist',
    'mental health professional'
  ];

  const lowercaseMessage = message.toLowerCase();
  return professionalHelpKeywords.some(keyword => lowercaseMessage.includes(keyword));
};

// Get professional help resources message
export const getProfessionalHelpMessage = () => {
  return `Here are some resources for finding professional mental health support:

1. Psychology Today Therapist Finder: https://www.psychologytoday.com/us/therapists
2. BetterHelp Online Counseling: https://www.betterhelp.com
3. SAMHSA Treatment Locator: https://findtreatment.samhsa.gov

Remember, seeking professional help is a sign of strength, not weakness.`;
};