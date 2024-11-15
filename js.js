const upload = document.getElementById("upload");
const main = document.getElementById("main");
const input = document.getElementById("input");
const edit = document.getElementById("edit");
const main2 = document.getElementById("main2");
const save = document.getElementById("save");
const inputDisable = document.getElementById("input-disable");
const scrollButton = document.getElementById("up");
const inputEnter = document.getElementsByClassName("input-enter");




// دالة حذف الملاحظة من اللوكال استوردج
function deleteNote(noteKey) {
    localStorage.removeItem(noteKey);
}
function updateNote(noteKeyUnique, updatedNoteContent) {
    localStorage.setItem(noteKeyUnique, updatedNoteContent);  // إعادة تخزين الملاحظة المعدلة في localStorage
}


// دالة انشاء تاسك (ادخال تاسك)
const post = () => {
    if (input.value.trim() == "") {
        alert("من فضلك ادخل التاسك");
    }
    else {

        const noteKey = `note-${Date.now()}`; // توليد مفتاح فريد باستخدام تاريخ الوقت الحالي


        // html code of note
        const noteHTML = ` <div class="main" >
        <div style="position: relative;" id="${noteKey}">
            <input type="text" value="${input.value.trim()}" readonly  class="input-enter" title="${input.value.trim()}">
            <i class="fa-regular fa-face-frown"></i>
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-solid fa-pen" id="edit"></i> 
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-copy"></i>
             <i id="save" class="fa-solid fa-floppy-disk"></i> 
             <i class="fa-solid fa-face-smile"></i>
            </div>
    </div>`;
        // اضافة التاسك في  div الرئيسي
        main.innerHTML += noteHTML;
        // اضافة الملاحظة في اللوكال استوردج
        localStorage.setItem(noteKey, noteHTML);
        input.value = "";
        input.focus();
    }
}



// stop


window.addEventListener("load", () => {
    // استرجاع الملاحظات من localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const noteKey = localStorage.key(i); // الحصول على المفتاح الفريد
        const noteContent = localStorage.getItem(noteKey);

        // تحقق إذا كان المفتاح يتبع معيارًا معينًا
        if (noteKey && noteKey.startsWith("note-")) { // استرجاع الملاحظات التي يبدأ مفتاحها بـ "note_"
            if (noteContent) {
                main.innerHTML += noteContent; // إضافة الملاحظة إلى الـ HTML
            }
        }
    }
    input.focus();
});



upload.addEventListener("click", (eo) => {
    post();
})

main.addEventListener("click", (eo) => {
    if (eo.target.classList.contains("fa-trash-can")) {
        eo.target.parentElement.remove();
        const noteKey = eo.target.parentElement.id;   // الحصول علي  ال  id 
        deleteNote(noteKey);  // حذف الملاحظة من الـ DOM وlocalStorage
    }
})

document.addEventListener("keypress", (eo) => {
    if (eo.key == "Enter" && input.value != "" && input.value.trim() != "") {
        post();
    }
})

main.addEventListener("click", (eo) => {
    // التحقق مما إذا كان العنصر الذي تم النقر عليه يحتوي على الفئة "fa-pen"
    if (eo.target.classList.contains("fa-pen")) {

        // كه يا معلم انت مسكت عنصر الادخال من خلال عنصر التعديل وبعدين الاب وبعدين هاتلي العنصر 
        const inputDisable1 = eo.target.parentElement.querySelector(".input-enter");

        // إزالة خاصية "readonly" من الحقل المدخل ليصبح قابل للتحرير
        inputDisable1.removeAttribute("readonly");

        // تفعيل التركيز على الحقل المدخل بحيث يمكن للمستخدم الكتابة فيه
        inputDisable1.focus();

        // تحديد النص الموجود داخل الحقل حتى يمكن تغييره بسهولة
        inputDisable1.select();

        // إظهار زر الحفظ "save"
        const save2 = eo.target.parentElement.querySelector(".fa-floppy-disk");

        save2.style.display = "block";

        // إخفاء زر التعديل "edit"

        eo.target.style.display = "none";

    }
});


const editInpute = (eo) => {
    // التحقق مما إذا كان العنصر الذي تم النقر عليه يحتوي على الفئة "fa-floppy-disk"
    if (eo.target.classList.contains("fa-floppy-disk")) {

        if (eo.target.parentElement.querySelector(".input-enter").value.trim() == "") {
            alert("من فضلك ادخل التاسك");
            return;
        }
        else {
            // اختيار حقل الإدخال الذي يحتوي على الفئة "input-enter" داخل العنصر الأب للعنصر الذي تم النقر عليه
            eo.target.parentElement.querySelector(".input-enter").setAttribute("readonly", "readonly");
            eo.target.style.display = "none";

            eo.target.parentElement.querySelector(".fa-pen").style.display = "block";
            eo.target.parentElement = eo.target.parentElement.querySelector(".input-enter").value

        }
    }

}


main.addEventListener("click", (eo) => {
    editInpute(eo);
});


document.addEventListener("keypress", (eo) => {
    if (eo.key == "Enter" && eo.target.classList.contains("input-enter")) {
        editInpute(eo);
        if (eo.target.parentElement.querySelector(".fa-floppy-disk")) {
            eo.target.parentElement.querySelector(".fa-floppy-disk").click();
        };
    }
})


main.addEventListener("click", (eo) => {
    if (eo.target.classList.contains("fa-face-frown")) {
        eo.target.parentElement.querySelector(".input-enter").style.backgroundColor = "green";
        eo.target.style.display = "none";
        eo.target.parentElement.querySelector(".fa-face-smile").style.display = "block";
        eo.target.parentElement.querySelector(".fa-face-smile").style.display = "block";
        eo.target.parentElement.querySelector(".input-enter").classList.add("finish")

        // تحديث الـ localStorage مع الملاحظة المعدلة

        const inputElement = eo.target.parentElement.querySelector(".input-enter");
        const noteKeyUnique = eo.target.parentElement.id; // الحصول على الـ ID الخاص بالملاحظة
        const updatedNoteContent = `<div style="position: relative;" id="${noteKeyUnique}">
            <input type="text" value="${inputElement.value.trim()}" readonly="" class="input-enter finish" title="${inputElement.value.trim()}" style="background-color: green;">
            <i class="fa-regular fa-face-frown" style="display: none;"></i>
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-solid fa-pen" id="edit"></i> 
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-copy"></i>
             <i id="save" class="fa-solid fa-floppy-disk"></i> 
             <i class="fa-solid fa-face-smile" style="display: block;"></i>
            </div>`;
        // تحديث الـ localStorage مع الملاحظة المعدلة
        updateNote(noteKeyUnique, updatedNoteContent);

    }
})

main.addEventListener("click", (eo) => {
    if (eo.target.classList.contains("fa-face-smile")) {
        eo.target.parentElement.querySelector(".input-enter").style.backgroundColor = "#52587E";
        eo.target.style.display = "none";
        eo.target.parentElement.querySelector(".fa-face-frown").style.display = "block";
        eo.target.parentElement.querySelector(".input-enter").classList.remove("finish")


        // تحديث الـ localStorage مع الملاحظة المعدلة

        const inputElement = eo.target.parentElement.querySelector(".input-enter");
        const noteKeyUnique = eo.target.parentElement.id; // الحصول على الـ ID الخاص بالملاحظة
        const updatedNoteContent = `<div style="position: relative;" id="${noteKeyUnique}">
            <input type="text" value="${inputElement.value.trim()}" readonly="" class="input-enter " title="${inputElement.value.trim()}" >
              <i class="fa-regular fa-face-frown"></i>
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-solid fa-pen" id="edit"></i> 
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-copy"></i>
             <i id="save" class="fa-solid fa-floppy-disk"></i> 
             <i class="fa-solid fa-face-smile"></i>
            </div>
    </div>`;
        // تحديث الـ localStorage مع الملاحظة المعدلة
        updateNote(noteKeyUnique, updatedNoteContent);

    }

})

// main.addEventListener("input", (eo) => {
//     if (eo.target.classList.contains("input-enter")) {

//         // التحقق مما إذا كان النص أطول من عرض حقل الإدخال
//         if (eo.target.scrollWidth > eo.target.clientWidth) {
//             // إذا تجاوز النص عرض حقل الإدخال، يتم تعيينه كعنوان (tooltip)
//             eo.target.title = eo.target.value;
//         } else {
//             // إذا لم يتجاوز النص عرض حقل الإدخال، يتم إلغاء العنوان
//             eo.target.title = "";
//         }
//     }
// });


// إظهار السهم عند التمرير لأسفل وإخفاؤه عند العودة إلى الأعلى
window.addEventListener("scroll", () => {

    if (window.scrollY > 200) {
        scrollButton.style.opacity = "1";
    } else {
        scrollButton.style.opacity = "0";
    }
})

// التمرير إلى أعلى الصفحة عند النقر على السهم
scrollButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // التمرير إلى الأعلى بسلاسة
});

// لما اعمل اسكرول هيتم تثبيت حقل ادخال التاسكات بالاسفل 
window.addEventListener("scroll", () => {
    if (window.scrollY > 1) {
        main2.classList.add("fixed");
       
    }
})



main.addEventListener("click", (eo) => {
    if (eo.target.classList.contains("fa-star")) {
        eo.target.classList.toggle("clicked");

        if (eo.target.classList.contains("clicked")) {
            // إذا تم إضافة الكلاس "clicked"عشان تكون اول عنصر 
            main.prepend(eo.target.parentElement);
            eo.target.style.color = "yellow";
            // eo.target.parentElement.querySelector("span").innerHTML = 1;
        } else {
            // إذا تم إزالة الكلاس "clicked"
            eo.target.style.color = "";
            main.append(eo.target.parentElement);
        }
    }
});

main.addEventListener("click", (eo) => {
    if (eo.target.classList.contains("fa-copy")) {
        // الحصول على قيمة النص في الحقل الذي تريد نسخه
        const textToCopy = eo.target.parentElement.querySelector(".input-enter").value;
        // نسخ النص إلى الحافظة
        navigator.clipboard.writeText(textToCopy).then(() => {
            document.querySelector(".copy-message").style.display = "block";
            setTimeout(() => {
                document.querySelector(".copy-message").style.display = "none";
            }, 3000);
        });
    }
})

