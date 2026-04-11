# Test Generation Standards

## Structure
Tests should follow the standard `describe`/`it` or `test` structure.
```typescript
describe('functionName', () => {
  it('should handle typical inputs correctly', () => {
    // Assertions
  });

  it('should handle edge case X gracefully', () => {
    // Assertions
  });
});
```

## Logic
*   Test for deterministic output based on specific input.
*   Verify that transformations (e.g., GeoJSON mapping) produce correct properties.
*   Ensure that normalization functions (e.g., `normalizeCountyName`) handle accents and special characters consistently.
