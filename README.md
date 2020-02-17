// TODO package.json тоже нужно по чистить
// TODO описание нужно будет поправить

# Запуск проекта

Мы используем yarn, а не npm. [Инструкция по установке yarn](https://yarnpkg.com/en/docs/install)

Установка зависимостей `yarn install`

Запуск storybook `yarn start`

Запуск тестов `yarn run test`

Перед пушем в репозиторий происходит сборка и загрузка Storybook на [Github Pages](https://gpn-prototypes.github.io/ui-kit) с помощью скрипта `deploy:storybook` в package.json, вызываемого в pre-push hook.

# Использование

### Установка

`yarn add @gpn-design/uikit`

### Применение

Для использования компонентов на проекте следует подключить стили компонентов, базовые стили дизайн-системы и сам компонент:

```javascript
import '@gpn-design/uikit/dist/style.css';
import { Button } from '@gpn-design/uikit';
```

Затем следует повесить на блок-контейнер классы тем:

```html
<body
  className="theme theme_breakpoint_default theme_color_gpn-default theme_control_gpn-default theme_font_small theme_gap_small theme_size_gpn-default theme_space_gpn-default"
>
  <button type="button" view="primary" wpSize="l" from="default" width="auto">Кнопка</button>
</body>
```

# Разработка

### Хуки

В проекте настроены git-хуки. На precommit выполняется линтинг с автофиксом.
На prepush собирается проект и запускаются тесты.

### Merge

Не используем squash, чтобы сохранялась вся история коммитов.
При подтягивания изменений из master'а в локальную ветку используем `git rebase`.
Для слияния изменений в master используем `git merge`.

### Прочее

При переименовании файлов проверяйте, что в git'е не удалился и создался заново файл.

Перед коммитом всегда проверяйте все изменения во всех файлах.

Иногда необходимо закоммитить и запушить без прогона хуков/линтеров/тестов.
Например, когда вы хотите показать проблему другому разработчику.
В таких случаях можно использовать `git commit --no-verify` и `git push --no-verify`

## Технические решения

За основу проекта взят [CRA](https://github.com/facebook/create-react-app)

### Typescript

Весь новый код пишем на Typescript.

### CSS

На проекте глобально подключён [whitepaper](https://whitepaper.tools/)

Используем БЭМ именование классов.

Можно использовать утилиту src/utils/bem для удобства именования по БЭМ методологии.

! TODO: Всё что ниже надо проверить на актуальность.

### Тесты

По stories storybook'а автоматом генерятся snapshot/screenshot тесты. Также, мы пишем unit-тесты на утилиты.

Планируем писать Enzyme тесты для React компонентов и e2e тесты, когда будем подключать бекенд.

Рекомендуется запускать тесты в watch режиме при разработке командой `yarn run test`.

Все снапшоты по всем storybook stories записываются в один файл.
Если снапшоты обновились, то надо перед коммитом проверить всё ли правильно в файле `src/components/__snapshots__/storyshots.test.js.snap`

По всем stories так же генерятся скриншоты.
Если скриншот-тесты падают, то надо посмотреть в папке `src/components/__image_snapshots__/__diff_output__` в чём именно проблема и пофиксить.
Возможны ложные срабатывания скриншот-тестов связанные с разницей рендеринга шрифтов на разных машинах.
Пока можно тюнить настройки срабатывания скриншот тестов в файле `src/components/storyshotsPuppeteer.test.js`

Чтобы обновить скриншот и снапшот тесты надо в интерактивном режиме запущенном командой `yarn run test` нажать клавишу `u` (update).

Относитесь к скриншот и снапшот тестам, как к обычным тестам. Если они падают, надо разобраться в чём причина и поправить.

## Список используемых пакетов

Линтеры / форматирование кода

prettier - Автоматическое форматирование кода
husky - Запуск скриптов перед коммитом
lint-staged - Run linters against staged git files

eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues
eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier

Typescript

typescript
@types/node
@types/react
@types/react-dom
@types/jest

@typescript-eslint/parser - is an alternative parser that can read Typescript code
@typescript-eslint/eslint-plugin - list of rules

eslint-config-react-app - установка @typescript-eslint/parser и @typescript-eslint/eslint-plugin приводит к тому, что eslint "теряет" eslint-config-react-app установленный в CRA

Тему storybook можно редактировать здесь `.storybook/whitepaperStorybookTheme.js`

@babel/core и babel-loader требуются storybook'ом как peer dependency https://storybook.js.org/docs/guides/guide-react/
