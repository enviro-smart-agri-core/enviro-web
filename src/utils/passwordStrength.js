// shared password validation used across signup + reset password

export const PASSWORD_RULES = [
    { id: 'length',  label: 'At least 8 characters',   test: (p) => p.length >= 8 },
    { id: 'lower',   label: 'One lowercase letter',     test: (p) => /[a-z]/.test(p) },
    { id: 'upper',   label: 'One uppercase letter',     test: (p) => /[A-Z]/.test(p) },
    { id: 'number',  label: 'One number',               test: (p) => /[0-9]/.test(p) },
];

// returns true only if every rule passes
export const isPasswordStrong = (password) =>
    PASSWORD_RULES.every((rule) => rule.test(password));
