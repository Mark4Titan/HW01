# HW01
# Скріншот результату виконання кожної команди.

 Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
node index.js --action="list"
![GitHub Pages settings](./screenshot/1.list.png)

Отримуємо контакт по id
node index.js --action="get" --id=5
![GitHub Pages settings](./screenshot/2.get.png)

Додаємо контакт
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"
![GitHub Pages settings](./screenshot/3.add.png)

Видаляємо контакт
node index.js --action="remove" --id=3
![GitHub Pages settings](./screenshot/4.remove.png)
