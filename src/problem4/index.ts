const sum_to_n_a = (n: number): number => {
  if (n <= 0) return 0;

  return n + sum_to_n_a(n - 1);
};

const sum_to_n_b = (n: number): number => {
  let i = 0,
    sum = 0;
  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
};

const sum_to_n_c = (n: number): number => {
  return Array.from({ length: n + 1 }, (_, i) => i).reduce((a, b) => a + b);
};

// RUN THIS FILE:
//
// npx ts-node index.ts
//
//

var n = 25; // result = 325

console.log("1. sum_to_n_a: ", sum_to_n_a(n));
console.log("2. sum_to_n_b: ", sum_to_n_b(n));
console.log("3. sum_to_n_c: ", sum_to_n_c(n));

// ERROR
// Argument of type 'string' is not assignable to parameter of type 'number'.
// console.log("1. sum_to_n_a: ", sum_to_n_a("string"));
