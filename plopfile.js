module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a React component with Storybook story",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/ui/{{kebabCase name}}/{{kebabCase name}}.stories.tsx",
        templateFile: "plop-templates/Component.stories.tsx.hbs",
      },
    ],
  });
};
