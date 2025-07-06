/**
 * Deep clone utility using structuredClone with fallback
 * structuredClone is a modern JavaScript API that can clone most types including:
 * - Objects, arrays, primitives
 * - Date objects, RegExp objects
 * - Map, Set, ArrayBuffer, TypedArray
 * - Circular references
 * - Functions (as values, not cloned)
 */

export function deepClone<T>(value: T): T {
  // Check if structuredClone is available (modern browsers)
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value);
    } catch (error) {
      // structuredClone might fail for some edge cases
      console.warn('structuredClone failed, falling back to manual clone:', error);
      return manualDeepClone(value);
    }
  }
  
  // Fallback for older browsers
  return manualDeepClone(value);
}

/**
 * Manual deep clone implementation as fallback
 * Handles basic types that structuredClone supports
 */
function manualDeepClone<T>(value: T): T {
  // Handle null and primitives
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Handle Date objects
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Handle RegExp objects
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Handle ArrayBuffer
  if (value instanceof ArrayBuffer) {
    return value.slice(0) as T;
  }

  // Handle TypedArrays
  if (ArrayBuffer.isView(value)) {
    return new (value.constructor as any)(value) as T;
  }

  // Handle Map
  if (value instanceof Map) {
    const newMap = new Map();
    for (const [key, val] of value.entries()) {
      newMap.set(deepClone(key), deepClone(val));
    }
    return newMap as T;
  }

  // Handle Set
  if (value instanceof Set) {
    const newSet = new Set();
    for (const val of value.values()) {
      newSet.add(deepClone(val));
    }
    return newSet as T;
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)) as T;
  }

  // Handle plain objects
  const clonedObj = {} as T;
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      (clonedObj as any)[key] = deepClone((value as any)[key]);
    }
  }
  return clonedObj;
}

/**
 * Type-safe deep clone with specific type constraints
 * Useful when you know the exact type you're cloning
 */
export function deepCloneTyped<T extends object>(value: T): T {
  return deepClone(value);
}

/**
 * Deep clone with circular reference detection
 * Note: structuredClone handles circular references automatically
 */
export function deepCloneWithCircularCheck<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  
  // For manual implementation, you'd need a WeakMap to track visited objects
  const visited = new WeakMap();
  return cloneWithVisited(value, visited);
}

function cloneWithVisited<T>(value: T, visited: WeakMap<object, any>): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Check for circular references
  if (visited.has(value as object)) {
    return visited.get(value as object);
  }

  // Handle Date objects
  if (value instanceof Date) {
    const cloned = new Date(value.getTime());
    visited.set(value as object, cloned);
    return cloned as T;
  }

  // Handle RegExp objects
  if (value instanceof RegExp) {
    const cloned = new RegExp(value.source, value.flags);
    visited.set(value as object, cloned);
    return cloned as T;
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    const cloned: any[] = [];
    visited.set(value as object, cloned);
    for (let i = 0; i < value.length; i++) {
      cloned[i] = cloneWithVisited(value[i], visited);
    }
    return cloned as T;
  }

  // Handle plain objects
  const clonedObj = {} as T;
  visited.set(value as object, clonedObj);
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      (clonedObj as any)[key] = cloneWithVisited((value as any)[key], visited);
    }
  }
  return clonedObj;
}

// Example usage and tests
export const deepCloneExamples = {
  // Basic object
  basicObject: () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);
    cloned.b.c = 3;
    console.log('Original:', original); // { a: 1, b: { c: 2 } }
    console.log('Cloned:', cloned);     // { a: 1, b: { c: 3 } }
    return { original, cloned };
  },

  // Array with nested objects
  arrayWithNested: () => {
    const original = [{ id: 1, data: { name: 'John' } }];
    const cloned = deepClone(original);
    cloned[0].data.name = 'Jane';
    console.log('Original:', original); // [{ id: 1, data: { name: 'John' } }]
    console.log('Cloned:', cloned);     // [{ id: 1, data: { name: 'Jane' } }]
    return { original, cloned };
  },

  // Date and RegExp
  dateAndRegex: () => {
    const original = {
      date: new Date('2023-01-01'),
      regex: /test/g,
      text: 'Hello World'
    };
    const cloned = deepClone(original);
    cloned.date.setFullYear(2024);
    cloned.regex = /new/g;
    console.log('Original date:', original.date); // 2023-01-01
    console.log('Cloned date:', cloned.date);     // 2024-01-01
    return { original, cloned };
  },

  // Map and Set
  mapAndSet: () => {
    const original = {
      map: new Map<string, any>([['key1', 'value1'], ['key2', { nested: 'value2' }]]),
      set: new Set([1, 2, { id: 3 }])
    };
    const cloned = deepClone(original);
    cloned.map.set('key1', 'updated');
    cloned.set.add(4);
    console.log('Original map size:', original.map.size); // 2
    console.log('Cloned map size:', cloned.map.size);     // 2 (but different content)
    return { original, cloned };
  }
}; 