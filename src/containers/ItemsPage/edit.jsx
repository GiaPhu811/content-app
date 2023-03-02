import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ItemsStore from './ItemsStore/ItemsStore';
import ItemsViewModel from './ItemsViewModels/ItemsViewModel';
import { ItemsViewModelContextProvider } from './ItemsViewModels/ItemsViewModelContextProvider';
import Edit from './Component/Edit';

const itemsStore = new ItemsStore();
const itemsViewModel = new ItemsViewModel(itemsStore);

const EditItems = observer(
  class EditItems extends Component {
    render() {
      return (
        <ItemsViewModelContextProvider viewModel={itemsViewModel}>
          <Edit />
        </ItemsViewModelContextProvider>
      );
    }
  }
);

export default EditItems;
