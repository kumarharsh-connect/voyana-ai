import { capitalizeWords } from '../format/text';

export type TripIntent = {
  destination?: string;
  days?: number;
  groupType?: 'solo' | 'couple' | 'friends' | 'family';
  confidence: 'high' | 'medium' | 'low';
};

function normalize(input: string) {
  return input.toLowerCase().trim();
}

function extractDays(input: string): number | undefined {
  const match = input.match(/(\d+)\s*[-]?\s*(day|days)/);
  if (!match) return undefined;
  return Number(match[1]);
}

function extractGroupType(input: string) {
  if (input.includes('family')) return 'family';
  if (input.includes('friends')) return 'friends';
  if (input.includes('couple')) return 'couple';
  if (input.includes('solo') || input.includes('alone')) return 'solo';
  return undefined;
}

const STOP_WORDS = [
  'trip',
  'vacation',
  'holiday',
  'for',
  'with',
  'from',
  'and',
  'couple',
  'family',
  'friends',
  'solo',
];

function extractDestination(input: string): string | undefined {
  const match = input.match(
    /\b(to|in)\s+([a-zA-Z\s]{3,}?)(?=\s+(trip|vacation|holiday|for|with|from|$))/,
  );
  if (!match) return undefined;

  const raw = match[2].trim();

  return capitalizeWords(raw);
}

function extractCapitalizedPhrase(rawInput: string): string | undefined {
  const match = rawInput.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
  return match?.[1];
}

function getConfidence({
  destination,
  days,
}: {
  destination?: string;
  days?: number;
}): 'high' | 'medium' | 'low' {
  if (destination && days) return 'high';
  if (destination) return 'medium';
  return 'low';
}

export function parseTripIntent(input: string): TripIntent {
  const rawInput = input.trim();
  const normalized = normalize(rawInput);

  const days = extractDays(normalized);
  const groupType = extractGroupType(normalized);

  let destination = extractDestination(normalized);

  if (!destination) {
    destination = extractCapitalizedPhrase(rawInput);
  }

  const confidence = getConfidence({ destination, days });

  return {
    destination,
    days,
    groupType,
    confidence,
  };
}
