$(document).ready(function(){
  $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    const confirmation = confirm('Are you sure?');

    if (confirmation){
        // alert($(this).data().id);
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/'+$(this).data().id
        }).done(function(response){
            window.location.replace('/');
        });
        window.location.replace('/');
    } else {
        return false;
    }
}
