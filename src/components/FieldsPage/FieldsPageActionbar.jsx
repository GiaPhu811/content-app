import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Icon } from '@iconify/react';
import { withTranslation } from 'react-i18next';
import history from 'routes/history';

const FieldsPageActionbar = observer(
  class FieldsPageActionbar extends Component {
    constructor(props) {
      super(props);
      this.isEdit = props.isEdit;
      this.viewModel = props.viewModel;
      this.backLink = props.backLink;
    }
    render() {
      const { t } = this.props;
      return (
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="fw-bold text-capitalize">{t(this.props.title)}</h2>
          </div>
          <div className="d-flex">
            <button
              onClick={() => history.push(this.backLink)}
              className="btn btn-outline-secondary px-16 py-11 text-capitalize border rounded-1 me-16 text-danger bg-white d-flex align-items-center"
            >
              <Icon className="me-10" icon="iconoir:cancel" width={24} height={24} />
              {t('txt_cancel')}
            </button>
            <button
              onClick={() => {
                this.viewModel.save(this.isEdit, true);
              }}
              className="btn btn-outline-secondary px-16 py-11 text-capitalize border rounded-1 me-16 text-blue-0 bg-white"
            >
              {t('txt_save_close')}
            </button>
            <button
              onClick={() => {
                this.viewModel.save(this.isEdit);
              }}
              className="btn btn-success px-16 py-11 text-capitalize fw-semibold rounded-1 d-flex align-items-center"
            >
              <Icon className="me-10" icon="teenyicons:save-outline" />
              {t('txt_save')}
            </button>
          </div>
        </div>
      );
    }
  }
);

export default withTranslation('common')(FieldsPageActionbar);
