django.jQuery(document).ready(function($) {
    var $roleField = $('#id_role');
    var $farmerFields = $('.field-farm_size, .field-location').closest('fieldset');
    var $cooperativeFields = $('.field-cooperative_name, .field-registration_number').closest('fieldset');
    var $institutionFields = $('.field-institution_name').closest('fieldset');

    function updateFields() {
        var role = $roleField.val();
        
        // Cacher tous les champs spécifiques aux rôles
        $farmerFields.hide();
        $cooperativeFields.hide();
        $institutionFields.hide();

        // Afficher les champs appropriés selon le rôle
        if (role === 'farmer') {
            $farmerFields.show();
        } else if (role === 'cooperative') {
            $cooperativeFields.show();
        } else if (['government', 'ngo', 'financial'].includes(role)) {
            $institutionFields.show();
        }
    }

    // Mettre à jour les champs au chargement
    updateFields();

    // Mettre à jour les champs quand le rôle change
    $roleField.change(updateFields);
});
