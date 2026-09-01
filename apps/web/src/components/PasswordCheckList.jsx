export const passwordRules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
  { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function PasswordCheckList({ password }) {
  return (
    <ul className="text-sm space-y-1 mt-1">
      {rules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.label}
            className={passed ? "text-green-500" : "text-muted-foreground"}
          >
            {passed ? "✓" : "○"}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
