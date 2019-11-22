import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useContext
} from 'react'

import styled from 'styled-components'
const Button = styled.button`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all .3s ease-in-out;
  border: solid 0.2em #37104a;
  background: rgb(67,27,84);
  background: linear-gradient(90deg, rgba(67,27,84,1) 0%, rgba(55,16,74,1) 54%, rgba(14,32,79,1) 90%);
  width: 100%;
  padding: 8px;
  color: gold;
  font-size: 18px;
  margin-bottom: 0.5em;
  
  &:hover, &:active {
    cursor: pointer;
    text-decoration: none;
  }
`

/**
 *
 * @type {React.Context<any>}
 */
export const ExpandableContext = createContext()
const { Provider } = ExpandableContext

/**
 *
 * @param children
 * @param className
 * @param otherProps
 * @returns {null}
 * @constructor
 */
export const Body = ({ children, className = '', ...otherProps }) => {
  const { expanded } = useContext(ExpandableContext)

  return expanded ? (
    <div {...otherProps}>
      {children}
    </div>
  ) : null
}

/**
 *
 * @param children
 * @param className
 * @param otherProps
 * @returns {*}
 * @constructor
 */
export const Header = ({ children }) => {
  const { toggle } = useContext(ExpandableContext)

  return (
    <Button onClick={toggle}>
      { children}
    </Button>
  )
}

/**
 *
 * @param children
 * @param onExpand
 * @returns {*}
 * @constructor
 */
const Expandable = ({ children, onExpand }) => {
  const [expanded, setExpanded] = useState(false)
  const toggle = useCallback(
    () => setExpanded(prevExpanded => !prevExpanded),
    []
  )
  const componentJustMounted = useRef(true)
  useEffect(
    () => {
      if (!componentJustMounted) {
        onExpand(expanded)
      }
      componentJustMounted.current = false
    },
    [expanded]
  )
  const value = useMemo(
    () => ({ expanded, toggle }),
    [expanded, toggle]
  )
  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export default Expandable
