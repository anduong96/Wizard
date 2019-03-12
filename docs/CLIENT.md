# Documentations

# Client Code Organization
<pre>
└── app
│    └── <a href="#sc-components">components</a>
│    │    └── [component name]
│    │        ├── index.js
│    │        ├── <a href="#scss-styles">[component name].scss</a>
│    │        └── <a href="#jest-tests">[component name].test.js</a>
│    │
│    └── <a href="#layout-components">layout</a>
│    │    ├── <a href="#layout-header">Header</a>
│    │    ├── <a href="#layout-body">Body</a>
│    │    └── <a href="#layout-footer">Footer</a>
│    │
│    └── <a href="#redux">store</a>
│    │    └── [state category]
│    │    │    ├── <a href="#redux-actions">actions.js</a>
│    │    │    ├── <a href="#redux-handler">handler.js</a>
│    │    │    ├── <a href="#redux-reducer">reducer.js</a>
│    │    │    └── <a href="#redux-types">types.js</a>
│    │    │
│    │    ├── <a href="#redux-init">init.js</a>
│    │    ├── <a href="#redux-root-reducer">root.jss</a>
│    │    ├── <a href="#localStorage">storage</a>
│    │    └── util.js
│    │
│    └── utilities
│    │    └── [utility name].js
│    │
│    └── <a href="#views">views</a>
│    │    └── [view name]
│    │        ├── index.js
│    │        ├── [view name].test.js
│    │        ├── [view name].scss
│    │        └── [view's components]
│    │            ├── index.js
│    │            ├── [view's children]
│    │            ├── [view's component].js
│    │            └── [view's component].scss
│    │
│    ├── <a href="#app.js">App.js</a>
│    ├── App.scss
│    ├── <a href="#index.js">index.js</a>
│    ├── <a href="#Router.js">Router.js</a>
│    └── <a href="#RouterConfig.js">RouterConfig.js</a>
└──
</pre>

# Glosarry
### <a id="sc-components"></a>Self-contained components
This directory is also known as “global” components.  It is used in different parts of an application.  In general, these component are like functions; in x and out y.  Therefore, you should not use redux in these components because they are meant to be non-specific to the application.

### <a id="scss-styles"></a>Sass Files
Sass are a superset of css. These file are usually imported into the index.js file. For Sass documentation, see their [tutorial](https://sass-lang.com/guide)

### <a id="jest-tests"></a>Jest Files
Unit test file to test the component's functionality. [Tutorial](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)

### <a id="layout-components"></a>Layout
This directory contain the layout of the application.  In here, we have the Header, Body, and Footer.  The advantage of the configuration is that it allow the application to stay consistent through different route changes.  Moreover, this can also serve as the client intialization.

#### <a id="layout-header"></a>Header
A component that display navigational information such as the application's logo, nav links, user's information, etc...

This component is connected with redux in order to manage user's information and routing.  Instead of redirecting the page to another route, we use React-router's browser history to take advantage of the virtual DOM.  [See documentation](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md)

#### <a id="layout-header"></a>Body
This is a simple component. Its purpose is to wrap around <a href="#view">the view</a>

#### <a id="layout-header"></a>Footer
This is a simple component.

### <a id="redux"></a>Redux
There are many code organzation of the redux store.  The purpose of implementing the chosen organization is to address the concern for scalability and simplicity and maintainability.  The intent is to centralize all of the states and all of its related handlers in its own category.  One of the advantages for this strategy is to reduce the cluttering of presentation components and application's states.

#### <a id="redux-actions"></a>Actions
The functions defined in this file will get dispatch to the store and handled by <a href="#redux-handler">the reducer</a>

Here is a sample the usual pattern
```python
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT', num: 5 }),
    reset: () => dispatch({ type: 'RESET' })
  }
}
```

In our code base, we take the dispatch's parameter and separate it into its own `action.js` file.  With [bindActionCreators](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-the-mapdispatchtoprops-function-with-bindactioncreators), dispatch is automatically passed to all of the action functions.

New pattern
```python
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        increment,
        decrement,
        reset
    }, dispatch)
});
```
#### <a id="redux-handler"></a>Reducer
An independent handler of the sub state.  When an action is dispatched, we change the state based on the type and other property of the action.

[In depth explaination](https://redux.js.org/basics/reducers)

#### <a id="redux-reducer"></a>Handler
This class will control the state of the reducer.  While it is probably an uncommon pattern, however, it is necessary when considering the maintainability of the codebase.

#### <a id="redux-types"></a>Action Types
An emulation of the enum patter.  This file contain all of the action types that get used by <a href="#redux-actions">the actions</a> and <a href="#redux-handler">the reducer</a>

#### <a id="redux-init"></a>Init.js
We handle redux store's intialzation in this file.  This is an opportunity to manage redux middlewares

#### <a id="redux-root-reducer"></a>root.js
It is very important that the all reducers are imported within this file and added as a parameter of the `combineReducers`.

More information on [combineReducers](https://redux.js.org/api/combinereducers)


#### <a id="localStorage"></a>storage.js
This file is utility file to handle the browser's localStorage API.  We use these functionalitys to intial the default state of the reducers and handle localStorage insertion.


### <a id="views"></a>Views
This the body of the application.  It displays a specfic content to the user.

### <a id="app.js"></a>App.js
This file is equivalent to `index.html` in `create-react-app`.  The only thing that is differnt is that we configure <a href="#redux">Redux store</a> here.

This file is exported to <a href="#RouterConfig.js">RouterConfig.js</a>.  It is used as an outer-most wrapper of <a href="#views">The view</a>.

### <a id="index.js"></a>index.js
Standard PayPal's react module.  See [documentations](https://github.com/paypal/react-engine)

It is configured in the `config.js` file, under `express`.

### <a id="Router.js"></a>Router.js
May or may not be best practice.  This file is use to handle the browser's deep routing and url changes.  Currently being used in <a href="#redux-handler">Redux reducer's handler</a>.

### <a id="RouterConfig.js"></a>RouterConfig.js
Handle application's routing.  I couldn't get `react-router v4` to work, so `react-router v3` will be a temporary solution.

see [documentations](https://curi.js.org/guides/migrate-rrv3/)
