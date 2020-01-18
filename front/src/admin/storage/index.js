import { createStore } from 'redux';


const initial_state = {
  tables: [],
  currentTable: '',
  currentTableColumns: [],
  currentTableContent: [],
  options: {

    limit: 100,
    offset: 0,
    conditions: [],
    order_by: '',
    asc_desc: 'desc',
    conditionType: '=',
    conditionDataType: 'str',
    conditionValue: null,
    conditionColumn: ''
  },
  editTableCell: {
    conditions: null,
    column_name: null,
    new_value: null,
  }
};



const optionsReducer = (state, action) => {

  switch (action.type) {
    case 'CLEAR_OPTIONS': {
      return {
        limit: 100,
        offset: 0,
        conditions: [],
        order_by: '',
        asc_desc: 'desc',
        conditionType: '=',
        conditionDataType: 'str',
        conditionValue: null,
        conditionColumn: ''
      }
    }
    case 'INPUT_LIMIT': {
      return {
        ...state,
        limit: action.payload,
      }
    }
    case 'INPUT_OFFSET': {
      return {
        ...state,
        offset: action.payload,
      }
    }
    case 'INPUT_ORDER_BY': {
      return {
        ...state,
        order_by: action.payload,
      }
    }
    case 'INPUT_ASC_DESC': {
      return {
        ...state,
        asc_desc: action.payload,
      }
    }
    case 'ADD_CONDITION': {
      return {
        ...state,
        conditions: [...state.conditions, action.payload],
      }
    }
    case 'CLEAR_CONDITION': {
      return {
        ...state,
        conditions: [],
      }
    }
    case 'INPUT_CONDITION_TYPE': {
      return {
        ...state,
        conditionType: action.payload,
      }
    }
    case 'INPUT_CONDITION_DATA_TYPE': {
      return {
        ...state,
        conditionDataType: action.payload,
      }
    }
    case 'INPUT_CONDITION_VALUE': {
      return {
        ...state,
        conditionValue: action.payload,
      }
    }
    case 'SELECT_CONDITION_COLUMN': {
      return {
        ...state,
        conditionColumn: action.payload,
      }
    }
    default:
      return state;
  }
};

export const reducer = (state=initial_state, action) => {

  switch (action.type) {
    case 'FETCH_TABLES': {
      return {
        ...state,
        tables: action.payload,
      }
    }
    case 'SET_CURRENT_TABLE': {
      return {
        ...state,
        currentTable: action.payload,
      }
    }
    case 'FETCH_CURRENT_TABLE_COLUMNS': {
      return {
        ...state,
        currentTableColumns: action.payload,
      }
    }
    case 'FETCH_CURRENT_TABLE_CONTENT': {
      return {
        ...state,
        currentTableContent: action.payload,
      }
    }
    case 'INPUT_NEW_VALUE_EDIT_TABLE_CELL': {
      return {
        ...state,
        editTableCell: {
          ...state.editTableCell,
          new_value: action.payload,}
      }
    }
    case 'INPUT_CONDITIONS_EDIT_TABLE_CELL': {
      return {
        ...state,
        editTableCell: {
          ...state.editTableCell,
          conditions: action.payload,}
      }
    }
    case 'INPUT_COLUMN_NAME_EDIT_TABLE_CELL': {
      return {
        ...state,
        editTableCell: {
          ...state.editTableCell,
          column_name: action.payload,}
      }
    }
    default: {
      return {
        ...state,
        options: optionsReducer(state.options, action),
      }
    }
  }

};


export const store = createStore(reducer);