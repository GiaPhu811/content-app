import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import FieldsPage from 'components/FieldsPage';
import FieldsPageActionBar from 'components/FieldsPage/FieldsPageActionbar';
import PAGE_STATUS from 'constants/PageStatus';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { withItemsViewModel } from '../ItemsViewModels/ItemsViewModelContextProvider';
import { observer } from 'mobx-react';
import SimpleReactValidator from 'simple-react-validator';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withRouter } from 'react-router-dom';

const Edit = observer(
  class Edit extends Component {
    itemDetailViewModel = null;
    formPropsData = {
      [CMS_ITEMS_DETAIL_FIELD_KEY.NAME]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE]: '',
    };
    isEdit = false;

    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.itemDetailViewModel = this.viewModel?.getItemsDetailViewModel();
      this.itemDetailViewModel.setForm(this);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.isEdit = props.match.params?.id ? true : false;
    }

    generateData = () => {
      const { t } = this.props;
      return {
        id: 1,
        groups: [
          {
            name: '',
            fields: [
              {
                label: t('txt_title'),
                key: 'title',
                type: FORM_FIELD_TYPE.INPUT,
                value:
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.NAME
                  ],
                className: 'col-12',
                required: true,
                validation: 'required',
                changed: (data) => {
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.NAME
                  ] = data.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Title');
                },
              },
              {
                label: t('txt_description'),
                key: 'description',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value:
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT
                  ],
                className: 'col-12',
                changed: (data) => {
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT
                  ] = data.target.value;
                },
              },
              {
                label: t('txt_intro_text'),
                key: 'intro_text',
                type: FORM_FIELD_TYPE.EDITOR,
                value:
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT
                  ],
                className: 'col-12',
                changed: (data) => {
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT
                  ] = data;
                },
              },

              {
                label: t('txt_thump'),
                key: 'thumb_image',
                type: FORM_FIELD_TYPE.IMAGE,
                value:
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE
                  ],
                className: 'col-12',
                changed: (data) => {
                  this.itemDetailViewModel.itemsDetailViewModel.formPropsData[
                    CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE
                  ] = data[0].download_url;
                },
              },
            ],
          },
        ],
      };
    };
    render() {
      return (
        <>
          {this.itemsDetailViewModel?.formStatus === PAGE_STATUS.LOADING ? (
            <Spinner className="spinner-overlay" />
          ) : (
            <div className="py-4 px-3 h-100 d-flex flex-column">
              <FieldsPageActionBar
                backLink={'/'}
                isEdit={this.isEdit}
                viewModel={this.itemDetailViewModel}
                title={!this.isEdit ? 'txt_add_item' : 'txt_update_item'}
              />
              <FieldsPage />
            </div>
          )}
        </>
      );
    }
  }
);
export default withRouter(withTranslation('common')(withItemsViewModel(Edit)));
