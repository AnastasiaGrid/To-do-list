Пет-проект "Simple to-do list"
=====================
Посмотреть и попробовать можно здесь: https://anastasiagrid.github.io/To-do-list/ 

Стек: HTML, SCSS, TS, React, Vite, Jest, Cypress

Структура проекта:

* src/ исходные файлы проекта
* src/components компоненты
* src/styles глобальные css переменные
* src/utils общие типы, переменные и функции

-----------------------------------
Архитектура приложения
-----------------------------------
Статичный сайт (SPA) позволяет записывать текущие дела, разделяя их по приоритетам и статусу выполнения. Реализована
возможность перетаскивания дел (drag-and-drop) между секциям.
У каждого дела есть заголовок, дата создания, чекбокс(позволяет автоматически переносить дело в "
Done"), корзинка для удаления задачи и кнопка редактирования таски.

### Компоненты

* App - основной компонент, разделяющий экран на три секции по статусу выполнения задач
* StatusBlock, Done - компоненты основных секций страницы, соответсвующие статусу выполнения
    * PriorityBlock - разделение задач в основной секции по приоритету
        * NoteItem - вложенный в контейнер компонент отображения одной задачи
* Modal - компонент модального окна

### Хранение данных

Задачи хранятся в LocalStorage.
