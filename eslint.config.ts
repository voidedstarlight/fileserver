import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
	globalIgnores(["**/dist"]),
	eslint.configs.recommended,
	stylistic.configs.customize({
		braceStyle: "1tbs",
		commaDangle: "never",
		indent: "tab",
		quotes: "double",
		semi: true
	}),
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			"default-param-last": "off",
			"no-shadow": "off",
			"no-use-before-define": "off",
			"prefer-destructuring": "off",
			"@stylistic/arrow-parens": ["error", "as-needed"],
			"@stylistic/function-call-spacing": "error",
			"@stylistic/max-len": ["warn", {
				code: 80,
				tabWidth: 2
			}],
			"@stylistic/multiline-comment-style": "warn",
			"@stylistic/no-extra-semi": "error",
			"@stylistic/no-confusing-arrow": "error",
			"@stylistic/nonblock-statement-body-position": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/default-param-last": "error",
			"@typescript-eslint/member-ordering": "warn",
			"@typescript-eslint/method-signature-style": "error",
			"@typescript-eslint/naming-convention": ["warn", {
				format: ["snake_case", "UPPER_CASE"],
				selector: "variable"
			}, {
				format: ["camelCase"],
				selector: "function"
			}, {
				format: ["PascalCase"],
				selector: "interface"
			}, {
				format: ["PascalCase"],
				selector: "class"
			}, {
				format: ["snake_case"],
				selector: "typeAlias"
			}],
			"@typescript-eslint/no-confusing-void-expression": "error",
			"@typescript-eslint/no-deprecated": "error",
			"@typescript-eslint/no-dynamic-delete": "error",
			"@typescript-eslint/no-extraneous-class": "error",
			"@typescript-eslint/no-for-in-array": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-invalid-void-type": "error",
			"@typescript-eslint/no-meaningless-void-operator": "error",
			"@typescript-eslint/no-misused-spread": "error",
			"@typescript-eslint/no-mixed-enums": "error",
			"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
			"@typescript-eslint/no-unnecessary-condition": "error",
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/no-unnecessary-template-expression": "error",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unused-expressions": ["error", {
				allowShortCircuit: true
			}],
			"@typescript-eslint/no-use-before-define": "error",
			"@typescript-eslint/no-useless-constructor": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/prefer-destructuring": "error",
			"@typescript-eslint/prefer-literal-enum-member": "error",
			"@typescript-eslint/prefer-reduce-type-parameter": "error",
			"@typescript-eslint/prefer-return-this-type": "error",
			"@typescript-eslint/related-getter-setter-pairs": "error",
			"@typescript-eslint/return-await": "error",
			"@typescript-eslint/unified-signatures": "error",
			"@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
			"no-useless-constructor": "off",
		}
	},
	{
		files: ["**/*.config.ts"],
		extends: [tseslint.configs.disableTypeChecked]
	}
);
