// dom elemnts
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
const addBtn = document.querySelector('#form.city.value');

// get documents
db.collection('cafe').get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            return renderCafe(doc); // calling function to print documents data
        });
    });

// print documents data into index page
function renderCafe(doc) {
    // create elelemnt under ul 
    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');
    const deleteBtn = document.createElement('div'); 

    // set attribute in li tag for each documnts and set text content
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    deleteBtn.textContent = 'X';

    // append name and city into li tag
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(deleteBtn);

    // append li into ul tag
    cafeList.appendChild(li);

    // delete data
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete();
    });
}

// send data to databse
form.addEventListener('submit', (e)=>{
    // prevent form default behaviour
    e.preventDefault();

    // get input value and add to database
    db.collection('cafe').add({
        name: form.name.value,
        city: form.city.value
    });

    // clear input field
    form.name.value = '';
    form.city.value = '';
});