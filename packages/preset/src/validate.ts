export function validatePresetOptions(options: {
  docs?: {
    title?: string;
    description?: string;
    editUrl?: string;
    rootUrl?: string;
    socials?: unknown;
  };
  root?: string;
  theme?: unknown;
}): void {
  const missingFields: string[] = [];

  if (!options) {
    throw new Error(
      '[@callstack/rspress-preset] Missing options. Provide the preset configuration object.'
    );
  }

  const { docs, root } = options;

  if (!docs) {
    missingFields.push('docs');
  } else {
    if (typeof docs.title !== 'string' || docs.title.trim() === '') {
      missingFields.push('docs.title');
    }
    if (
      typeof docs.description !== 'string' ||
      docs.description.trim() === ''
    ) {
      missingFields.push('docs.description');
    }
    if (typeof docs.editUrl !== 'string' || docs.editUrl.trim() === '') {
      missingFields.push('docs.editUrl');
    }
    if (typeof docs.rootUrl !== 'string' || docs.rootUrl.trim() === '') {
      missingFields.push('docs.rootUrl');
    }
  }

  if (typeof root !== 'string' || root.trim() === '') {
    missingFields.push('root');
  }

  if (missingFields.length > 0) {
    throw new Error(
      `[@callstack/rspress-preset] Missing or invalid required options: ${missingFields.join(', ')}. Please provide all required fields.`
    );
  }
}
