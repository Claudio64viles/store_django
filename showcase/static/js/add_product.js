let previousCategory = ``;
const listeners = async () => {
    categorySelect.addEventListener("change", (event) => {
        if (event.target.value != '') {
            loadSubcategories(event.target.value);
            loadFeatureFormFromCategory(event.target.value);
            previousCategory = categorySelect.options[categorySelect.selectedIndex].text
        }
    });
    addCategorySaveButton.addEventListener("click", (event) => {        
        if(categoryNameTxt.value != '')
        {
            event.preventDefault();
            console.log('category : all ok!');
            newCategoryPost();
        }       
    });
    addBrandSaveButton.addEventListener("click", (event) => {        
        if(brandNameTxt.value != '')
        {
            event.preventDefault();
            console.log('brand : all ok!');
            newBrandPost();
        }       
    });
    addManufacturerSaveButton.addEventListener("click", (event) => {        
        if(manufacturerNameTxt.value != '')
        {
            event.preventDefault();
            console.log('manufacturer : all ok!');
            newManufacturerPost();
        }       
    });
    addDistributorSaveButton.addEventListener("click", (event) => {        
        if(distributorNameTxt.value != '')
        {
            event.preventDefault();
            console.log('distributor : all ok!');
            newDistributorPost();
        }       
    });
};

const loadSubcategories = async (id) => {
    try {
        const response = await fetch(`/products/get_subcategory/${id}`);
        const data = await response.json();

        if (data.message === "Success") {
            if (id != 0) {
                previousCategoryTxt.innerHTML = previousCategory + '/';
            }
            else {
                previousCategoryTxt.innerHTML = ``;
                loadFeatures.innerHTML = ``;
            }
            let categories = data.categories;
            let select_options = `<option value='0'>-</option>`;
            categories.forEach((category) => {
                select_options += `<option value='${category.id}'>${category.name}</option>`;
            });
            categorySelect.innerHTML = select_options;
        }
    }
    catch (error) {
        console.log(error);
    }
};
//These 4 methods load all registry in a select tag
const loadCategories = async () => {
    try {
        const response = await fetch(`/products/get_categories/`);
        const data = await response.json();

        if (data.message === "Success") {
            let categories = data.categories;
            let select_options = `<option value='0'>-</option>`;
            categories.forEach((category) => {
                select_options += `<option value='${category.id}'>ID:${category.id} ${category.name}</option>`;
            });
            categorySelectAll.innerHTML = select_options;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const loadBrands = async () => {
    console.log('get brands');
    try {
        const response = await fetch(`/products/get_brands/`);
        const data = await response.json();

        if (data.message === "Success") {
            let brands = data.brands;
            let select_options = `<option value='0'>-</option>`;
            brands.forEach((brand) => {
                select_options += `<option value='${brand.id}'> ${brand.name}</option>`;
            });
            brandSelect.innerHTML = select_options;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const loadManufacturers = async () => {
    console.log('get manufacturers');
    try {
        const response = await fetch(`/products/get_manufacturers/`);
        const data = await response.json();

        if (data.message === "Success") {
            let manufacturers = data.manufacturers;
            let select_options = `<option value='0'>-</option>`;
            manufacturers.forEach((manufacturer) => {
                select_options += `<option value='${manufacturer.id}'> ${manufacturer.name}</option>`;
            });
            manufacturerSelect.innerHTML = select_options;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const loadDistributors = async () => {
    console.log('get distributors');
    try {
        const response = await fetch(`/products/get_distributors/`);
        const data = await response.json();

        if (data.message === "Success") {
            let distributors = data.distributors;
            let select_options = `<option value='0'>-</option>`;
            distributors.forEach((distributor) => {
                select_options += `<option value='${distributor.id}'> ${distributor.name}</option>`;
            });
            distributorSelect.innerHTML = select_options;
        }
    }
    catch (error) {
        console.log(error);
    }
};

////

const loadFeatureFormFromCategory = async (id) => {
    try {
        const response = await fetch(`/products/get_features/${id}`);
        const data = await response.json();

        if (data.message === "Success") {
            let features = data.features;
            let features_form = ``;
            features.forEach((features) => {
                features_form += `<div class="form-group">`;
                features_form += `<label>${features.name}</label>`;
                features_form += `<input class="form-control" id="txt_${features.id}" name="txt_${features.id}" placeholder="value...">`;
                features_form += `</div>`;
            });
            loadFeatures.innerHTML = features_form;
        }
        else {
            loadFeatures.innerHTML = ``;
        }
    }
    catch (error) {
        console.log(error);
    }
};


/*function newCategory()
{
    fetch('add_category/')
    .then(response=> response.text())
    .then(text=> newCategoryForm.innerHTML = text);
    newCategoryForm.style.zIndex = '100';
    //newCategoryForm.style.position = 'relative';
    newCategoryForm.style.marginLeft = 'auto';
    newCategoryForm.style.marginRight = 'auto';
    newCategoryForm.style.background = 'white';
    newCategoryForm.style.overflow = 'hidden';
}*/

//These 4 functions send a post to create new registry in DB 
const newCategoryPost = async () => {
    try {
        const csrftoken = getCookie('csrftoken');
        const name = categoryNameTxt.value;
        const parent_category_id = categorySelectAll.value;
        console.log(csrftoken);
        console.log(name);
        console.log(parent_category_id);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('parent_category_id', parent_category_id);

        const response = await fetch(`/products/add_category/`,
            {
                method: 'POST',
                headers: { 'X-CSRFToken': csrftoken },
                mode: 'same-origin',
                body: formData,
            });
        const data = await response.json();

        if (data.message === "Success") {
            console.log("It's OK");
            //console.log(data);
            loadCategories();
            loadSubcategories(0);
            categoryNameTxt.value = ``;
            $('#newCategory').modal('hide');
            //console.log(data.values.name);
            //console.log(data.values.parent_category_id);
        }
    }
    catch (error) {
        console.log(error);
    }
};

const newBrandPost = async () => {
    try {
        const csrftoken = getCookie('csrftoken');
        const name = brandNameTxt.value;
        console.log(csrftoken);
        console.log(name);
        const formData = new FormData();
        formData.append('name', name);

        const response = await fetch(`/products/add_brand/`,
            {
                method: 'POST',
                headers: { 'X-CSRFToken': csrftoken },
                mode: 'same-origin',
                body: formData,
            });
        const data = await response.json();

        if (data.message === "Success") {
            console.log("It's OK");
            //console.log(data);
            loadBrands();
            brandNameTxt.value = ``;
            $('#newBrand').modal('hide');
        }
    }
    catch (error) {
        console.log(error);
    }
};

const newManufacturerPost = async () => {
    try {
        const csrftoken = getCookie('csrftoken');
        const name = manufacturerNameTxt.value;
        console.log(csrftoken);
        console.log(name);
        const formData = new FormData();
        formData.append('name', name);

        const response = await fetch(`/products/add_manufacturer/`,
            {
                method: 'POST',
                headers: { 'X-CSRFToken': csrftoken },
                mode: 'same-origin',
                body: formData,
            });
        const data = await response.json();

        if (data.message === "Success") {
            console.log("It's OK");
            //console.log(data);
            loadManufacturers();
            manufacturerNameTxt.value = ``;
            $('#newManufacturer').modal('hide');
        }
    }
    catch (error) {
        console.log(error);
    }
}

const newDistributorPost = async () => {
    try {
        const csrftoken = getCookie('csrftoken');
        const name = distributorNameTxt.value;
        console.log(csrftoken);
        console.log(name);
        const formData = new FormData();
        formData.append('name', name);

        const response = await fetch(`/products/add_distributor/`,
            {
                method: 'POST',
                headers: { 'X-CSRFToken': csrftoken },
                mode: 'same-origin',
                body: formData,
            });
        const data = await response.json();

        if (data.message === "Success") {
            console.log("It's OK");
            //console.log(data);
            loadDistributors();
            distributorNameTxt.value = ``;
            $('#newDistributor').modal('hide');
        }
    }
    catch (error) {
        console.log(error);
    }
};
////
function newCategoryModal() {
    $('#newCategory').modal('show');
    loadCategories();
}

function newBrandModal()
{
    $('#newBrand').modal('show');
}

function newManufacturerModal()
{
    $('#newManufacturer').modal('show');
}

function newDistributorModal()
{
    $('#newDistributor').modal('show');
}




//Code from Django documentation
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




window.addEventListener("load", async () => {
    await listeners();
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();