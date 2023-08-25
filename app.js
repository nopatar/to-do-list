// ค่าเริ่มต้นจะให้ array ว่าง //
// หากเคยทำการ addItem ข้อมูลจะถูกเก็บไว้เป็น js object // 
const storedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

// รับข้อมูลที่ผู้ใช้กรอกเพิ่มลง storedItems และบันทึกใน localStorage //
function addItem() {
    const inputElement = document.getElementById("input-element");
    const inputValue = inputElement.value;

    const item = {
    text: inputValue,
    checked: false
    };

    storedItems.push(item);

    localStorage.setItem("todoItems", JSON.stringify(storedItems));

    displayItems();
    
    inputElement.value = "";
}

// แสดงข้อมูลที่ถูกบันทึกจาก storedItems //
// กำหนดรูปแบบและรายการแสดงผลเป็น row ประกอบด้วย checkbox text และ deleteButton //
function displayItems() {
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML = ""; 

    for (var i=0; i < storedItems.length; i++) {
    const item = storedItems[i];

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("itemDiv")

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;

    const span = document.createElement("span");
    span.textContent = item.text;
    if (item.checked) {
        span.style.textDecoration = "line-through"; 
    }

    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteButton.classList.add("deleteButton")
    deleteIcon.classList.add("fas", "fa-trash");
    deleteButton.appendChild(deleteIcon);

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(span);
    itemDiv.appendChild(deleteButton);

    checkbox.addEventListener("change", checkedItem(checkbox, span, item));

    deleteButton.addEventListener("click", delItemButton(i));

    itemContainer.appendChild(itemDiv);
    }
}

// สำหรับอัพเดทข้อมูลใน storedItems เมื่อแต่ละรายการ checked / uncheck ใด ๆ //
function checkedItem(checkbox, span, item) {
    return function() {
        item.checked = checkbox.checked;
        localStorage.setItem("todoItems", JSON.stringify(storedItems));
    if (checkbox.checked) {
        span.style.textDecoration = "line-through";
    } else {
        span.style.textDecoration = "none";
        }
    };
}

// สำหรับลบข้อมูลในรายการที่มีการคลิกปุ่ม deleteButton ออกจาก storedItems และแสดงข้อมูลที่เหลืออยู่ //
function delItemButton(index) {
    return function() {
        storedItems.splice(index, 1);
        localStorage.setItem("todoItems", JSON.stringify(storedItems));
    displayItems();
    };
}  

// สำหรับรับข้อมูลจากผู้ใช้โดยการกดปุ่ม enter เช่นเดียวกับการ คลิก //
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addItem();
    }
} 

// สำหรับแสดงวันที่ปัจจุบัน //
function getDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    const dateElement = document.getElementById("date");
    dateElement.textContent = formattedDate;
}

getDate();
displayItems();

