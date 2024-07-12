
var sum_to_n_a = function(n) {
  if (n <= 0) return 0;

  return n + sum_to_n_a(n - 1);
};

var sum_to_n_b = function(n) {
  let i = 0, sum = 0;
  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
};

var sum_to_n_c = function(n) {
  return Array.from({length: n + 1}, (_, i) => i).reduce((a, b) => a + b);
};

var n = 25; // result = 325

console.log('1. sum_to_n_a: ', sum_to_n_a(n));
console.log('2. sum_to_n_b: ', sum_to_n_b(n));
console.log('3. sum_to_n_c: ', sum_to_n_c(n));