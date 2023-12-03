	youtube link: https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
    
    • Redux consists of store, action and reducer
	• Store is the place which stores all the data
	• Action is the one via which we can manipulate the data
	• Action is simply an js object with a type property
	• Reducer is the one that manipulates the store data based on some logic.
	• So in order to change data, the app must dispatch an action which is then handled by the reducer 
	• In redux we write actionCreators -> this is nothing but a function that returns an object.
Redux Store responsibilities:
	• One store for the entire applocation
	• Holds application state (create store using createStore(reducer))
	• Allow access to state via getState()
	• Allow state to be updated via dispatch(action)
	• Registers listeners via subscribe(listener)
Handles unregistering of listeners via the function returned by subscribe(listener)