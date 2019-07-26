import React, { useState, useEffect } from 'react'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import styled from 'styled-components'

const Menu = styled.ul`
  padding: 0;
  margin-top: 0;
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  transition: opacity 0.1s ease;
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-color: #96c8da;
  border-top-width: 0;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
  border: ${props => (props.isOpen ? null : 'none')};
`

const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 47px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Item = styled.li`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  padding: 0.8rem 1.1rem;
  white-space: normal;
  word-wrap: normal;

  ${({isActive}) =>
    isActive &&
    `
    color: rgba(0,0,0,.95);
    background: rgba(0,0,0,.03);
  `}

  ${({isSelected}) =>
    isSelected &&
    `
    color: rgba(0,0,0,.95);
    font-weight: 700;
  `}
`

const ArrowIcon = ({isOpen}) => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={16}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
    transform={isOpen ? 'rotate(180)' : null}
  >
    <path d="M1,6 L10,15 L19,6" />
  </svg>
)

class MultiDownshift extends React.Component {
  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.props.handleInputChange(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const { selectedItems } = this.props
    const { getRemoveButtonProps } = this
    return {
      getRemoveButtonProps,
      selectedItems,
      ...downshift,
    }
  }

  render() {
    const {render, children = render, handleInputChange, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={handleInputChange}
        selectedItem={null}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}

const MultiDownshiftContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  margin-top: 50px; */
  background: ${props => props.theme.white};
`

const Dropdown = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: ${props => props.theme.borderRadius};
  border-bottom-right-radius: ${props => props.isOpen ? '0' : props.theme.borderRadius};
  border-bottom-left-radius: ${props => props.isOpen ? '0' : props.theme.borderRadius};
  padding: 10px;
  padding-right: 50px;
  border: 1px solid #bebebe;
`

const TextInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const SelectedPill = styled.div`
  margin: 2px;
  padding: 0.5rem 1rem;
  display: inline-block;
  word-wrap: none;
  background-color: #ddd;
  border-radius: ${props => props.theme.borderRadius};
`

const SelectedPillContentWrap = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-auto-flow: column;
  align-items: center;
`

const SelectedPillX = styled.button`
  cursor: pointer;
  line-height: 0.8;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 16px;
`

const TextInput = styled.input`
  border: none;
  margin-left: 6px;
  flex: 1;
  font-size: 14px;
  min-height: 27px;
`

const MultiSelectField = props => {
  const { field, inputs, setInputValue } = props
  const { id, choices, description } = field
  const input = React.createRef()
  const itemToString = item => (item ? item.name : '')

  const getSelectedItems = () => {
    const selectedValues = (inputs[id] || '').split(',')
    return choices.filter(item => selectedValues.includes(item.value))
  }

  const selectedItems = getSelectedItems()

  const getItems = filter => {
    return filter
      ? matchSorter(choices, filter, { keys: ['text'] })
      : choices
  }

  const handleInputChange = item => {
    const newSelectedItems = selectedItems.includes(item) ? removeItem(item) : addItem(item)
    setInputValue(id, newSelectedItems.map(item => item.value).join())
  }

  const removeItem = item => selectedItems.filter(i => i !== item)

  const addItem = item => [...selectedItems, item]

  return (
    <MultiDownshiftContainer>
      <MultiDownshift
        selectedItems={selectedItems}
        handleInputChange={handleInputChange}
        itemToString={itemToString}
      >
        {({
          getInputProps,
          getToggleButtonProps,
          getMenuProps,
          getRemoveButtonProps,
          isOpen,
          inputValue,
          getItemProps,
          highlightedIndex,
          toggleMenu,
        }) => (
          <div style={{margin: 'auto', position: 'relative'}}>
            <Dropdown
              onClick={() => {
                toggleMenu()
                !isOpen && input.current.focus()
              }}
            >
              <TextInputContainer>
                {selectedItems.length > 0 &&
                  selectedItems.map(item => (
                    <SelectedPill key={item.value}>
                      <SelectedPillContentWrap>
                        <span>{item.text}</span>
                        <SelectedPillX {...getRemoveButtonProps({item})}>
                          𝘅
                        </SelectedPillX>
                      </SelectedPillContentWrap>
                    </SelectedPill>
                  ))}
                <TextInput
                  {...getInputProps({
                    ref: input,
                    onKeyDown(event) {
                      if (event.key === 'Backspace' && !inputValue) {
                        handleInputChange(selectedItems[selectedItems.length - 1])
                      }
                    },
                  })}
                  placeholder={
                    selectedItems.length < 1 ? description : ''
                  }
                />
              </TextInputContainer>
              <ControllerButton
                {...getToggleButtonProps({
                  // prevents the menu from immediately toggling
                  // closed (due to our custom click handler above).
                  onClick(event) {
                    event.stopPropagation()
                  },
                })}
              >
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            </Dropdown>
            <Menu {...getMenuProps({isOpen})}>
              {isOpen
                ? getItems(inputValue).map((item, index) => (
                    <Item
                      key={item.value}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItems.includes(item),
                      })}
                    >
                      {item.text}
                    </Item>
                  ))
                : null}
            </Menu>
          </div>
        )}
      </MultiDownshift>
    </MultiDownshiftContainer>
  )
}

export default MultiSelectField
