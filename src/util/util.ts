function excludeField<T extends object, K extends keyof T>(
  obj: T,
  field: K
): Omit<T, K> {
  const { [field]: _, ...rest } = obj; // Extract and exclude the field
  return rest;
}

export { excludeField };
