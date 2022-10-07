var Exment;
(function (Exment) {
    class CustomFromItem {
        /**
         * Initialize by hidden element
         * @param $elem
         */
        static makeByHidden($elem) {
            let result = new CustomFromItem();
            //TODO: how no set best way
            result.form_block_type = $elem.find('.form_block_type').val();
            result.form_block_target_table_id = $elem.find('.form_block_target_table_id').val();
            result.form_column_type = $elem.find('.form_column_type').val();
            result.column_no = $elem.find('.column_no').val();
            result.form_column_target_id = $elem.find('.form_column_target_id').val();
            result.header_column_name = $elem.find('.header_column_name').val();
            result.options = JSON.parse($elem.find('.options').val());
            return result;
        }
        /**
         * Initialize by modal window.
         * *For only set option value.*
         */
        static makeByModal() {
            let result = new CustomFromItem();
            let $modal = $('#modal-showmodal');
            let options = {};
            $.each($modal.find('form').serializeArray(), function () {
                options[this.name] = this.value;
            });
            // Hard coding. Get tinymce content if default value is editor.
            let defaultTinyMCE = tinyMCE.get('default');
            if (hasValue(defaultTinyMCE) && $modal.find('[data-default_timymce]').length > 0) {
                options['default'] = defaultTinyMCE.getContent();
            }
            result.options = options;
            return result;
        }
        /**
         * get option
         */
        getOption() {
            return this.options;
        }
        /**
         * Show setting modal
         */
        showSettingModal($target) {
            // TODO: best way
            const formData = {
                form_block_type: this.form_block_type,
                form_block_target_table_id: this.form_block_target_table_id,
                form_column_type: this.form_column_type,
                row_no: this.row_no,
                column_no: this.column_no,
                form_column_target_id: this.form_column_target_id,
                header_column_name: this.header_column_name,
                options: this.options,
            };
            Exment.ModalEvent.ShowModal($target, URLJoin($('#formroot').val(), 'settingModal'), formData);
        }
    }
    Exment.CustomFromItem = CustomFromItem;
})(Exment || (Exment = {}));
