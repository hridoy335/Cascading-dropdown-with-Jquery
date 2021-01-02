$(document).ready(function () {

    alert("Js Loaded");
    LoadCategory();
});

function LoadCategory() {

    //ajax function for fetch data
    $.ajax({
        type: "GET",
        url: '/Test2/getProductCategories',
        success: function (data) {
            //Categories = data;
            ////render catagory
            //renderCategory(element);

            var sep1 = $('#productCategory');
            $.each(data, function (k, v) {
                sep1.append('<option value="' + v.CategoryID + '">' + v.CategortyName + '</option>');
                //console.log(JSON.stringify(v.Name));
            });
            //LoadProduct(categoryDD);
        }
    })
}

function LoadProduct(categoryDD) {
    $('#product').empty();

    $.ajax({
        type: "GET",
        url: "/Test/getProducts",
        data: { 'categoryID': $(categoryDD).val() },
        success: function (data) {

            var sep1 = $('#product');
            $.each(data, function (k, v) {
                sep1.append('<option value="' + v.ProductID + '">' + v.ProductName + '</option>');
                //console.log(JSON.stringify(v.Name));
            });
          //  console.log(JSON.stringify(data));
        }
    })
}

// Add Mill in view table
jQuery(document).delegate('.add-record', 'click', function (e) {
    e.preventDefault();
    //alert("Add function call");
   // debugger
    var catagori = $('#productCategory').val()
    var product = $('#product').val();
    var rate = $('#rate').val();
    var quantity = $('#quantity').val();


    if (product == null || typeof (product) == 'undefined' || product == '') {
        alert('Please Select product');
        return;
    }

    if (catagori == null || typeof (catagori) == 'undefined' || catagori == '') {
        alert('Please Select catagori');
        return;
    }

    if (rate == null || typeof (rate) == 'undefined' || rate == '') {
        alert('Please Insert Mirning mill');
        return;
    }
    if (quantity == null || typeof (quantity) == 'undefined' || quantity == '') {
        alert('Please Insert Lunch mill');
        return;
    }


    var content = jQuery('#sample_table tr'),
        size = jQuery('#resultTable >tbody >tr').length - 1,
        element = null,
        element = content.clone();

    element.attr('id', 'rec-' + size);
    element.find('.delete-record').attr('data-id', size);
    element.appendTo('#resultTable_body');
    //// var i=element.find('id');
    ////alert();

    element.find('.sn').html(size);
    element.find('.product').html(product);
    element.find('.rate').html(rate);
    element.find('.quantity').html(quantity);

    $('#productCategory').val('');
    $('#product').val('');
    $('#rate').val('');
    $('#quantity').val('');

    ////alert(Mirning);
    ////console.log(JSON.stringify(content));
    //var totalMorning = calculateTotalMorning();
    //var totalLunch = calculateTotalLunch();
    //var totalDinner = calculateTotalDinner();

    //$('#totalMorning').html(totalMorning);
    //$('#totalLunch').html(totalLunch);
    //$('#totalDinner').html(totalDinner);
    ////$('#total2').html(sgpa);
    ////$("#course option[value='" + courseValue +"']").remove();

});

// Save Mill and Bazar in this database
function saveData() {


    var rowCount = 0;
    $('#resultTable tr').each(function () {
        var product = $(this).find(".product").html();
        if (product !== null && typeof (product) !== 'undefined') {
            rowCount += 1;
        }
    });
    console.log(JSON.stringify(rowCount));

    if (rowCount == 0) {
        alert('Data Grid is empty.. ');
        return;
    }


    var reportResultList = [];
    $('#resultTable tr').each(function () {
        var product = $(this).find(".product").html();
        var rate = $(this).find(".rate").html();
        var quantity = $(this).find(".quantity").html();

        if (product !== null && typeof (product) !== 'undefined') {
            var data = {
                //ReportResultId: 1,
             
                ProductID: product,
                Rate: rate,
                Quantity: quantity,
            }

            //reportResultList.push(data);
            $.ajax({
                type: "POST",
                url: "../Test2/PostIndex",
                data: data,
                success: function (data) {
                    // if (data > 0) {
                    alert("Data saved successfully");
                    // } else {
                    //    alert("Something went wrong! please try again!");
                    //}

                    console.log(JSON.stringify(data));
                }
            });
        }




    })
}
