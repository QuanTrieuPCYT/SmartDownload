var productList = {}
const typeObj = $("#type")
const versionObj = $("#version")
const editionObj = $("#edition")
const downloadURL = $("#download")

$.getJSON("/products.json", function (data) {
    productList = data;
    $("#loading").html("Ready!")
    // Update the products list
    
    for (key in productList) {
        typeObj.append(new Option(key, key))
    }
})

function updateVersions() {
    $("#version option").each(function () {
        if (!$(this).prop("disabled")) {
            $(this).remove()
        }
    })
    $("#version option[value=\"placeholder\"]").prop("selected", true)
    for (key in productList[typeObj.val()]) {
        versionObj.append(new Option(key, key))
    }
    updateEditions()
}

function updateEditions() {
    $("#edition option").each(function () {
        if (!$(this).prop("disabled")) {
            $(this).remove()
        }
    })
    $("#edition option[value=\"placeholder\"]").prop("selected", true)
    for (key in productList[typeObj.val()][versionObj.val()]) {
        editionObj.append(new Option(key, key))
    }
    updateURL()
}

function updateURL() {
    if (typeObj.val() && versionObj.val() && editionObj.val()) {
        const url = productList[typeObj.val()][versionObj.val()][editionObj.val()]
        downloadURL.prop("href", url)
    } else {
        downloadURL.prop("href", "")
    }
}