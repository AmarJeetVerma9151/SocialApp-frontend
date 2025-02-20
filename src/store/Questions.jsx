// react js -->js library
                // component based
                // reusable
                //single page application

//component --> //component is a small piece of code that code that can be resusable
                // function based   , class based component

//functional component --> functional component is a simpler way of defining component in react, function component can be created just like function in javascript. in react functional component return a react element and can include html css and js code

// Virtual DOM -->it is a copy of original dom. when a components state or props changes react create a new virtual dom tree . and compare it to the previous tree then apply minimal set of changes necessary to real dom

//JSX --> javascript XML -->with the help o jsx you can write html inside js . browser can not read jsx it can only read js objects. so we need to transform jsx into js object by using transformers like babel

//CSS -->   // inline
            //external
            //internal
            //using modules


//States --> state in react are objects that can store data that can be change and can be managed bvy components,

//props --> props are used to pass data from parent to child component . props are readonly child can not modify the value of props

// higher order components -- > components that take other components as an argument are known as HOC example react memo

//higher order function -->  functions that return other functions or take other function as  an argument are known as HOF    

//callback function -->  functions that are returned by some other functions or functions that are passed into other function as an argument are knwon as CB functions

// map vs forEach -->  // map and forEach both are used to traverse through an array
                        //map method return a new array for each only works on real array
                        //map method can be used with other array methods like filter findIndex where forEach can not be used 

//controlled and uncontrolled components -->  value of react element is directle controlled by DOM are known as uncontrolled component example --> useRef()

// in controlled component value is controlled by components using onchange method.

// hooks --> hooks are functions that allow you to use state in functional components. they were introduced in 16.8. hooks must be called at top level;

//useState --> it is a hook that can be used to store a value and can be used to rerender of component whereever the state changes. it takes two parameters one for storing value and other is a function to update the value or state;


//useEffect --> it is a hook it is used to run side effects such as updating The DOM , fetching THe APIS, it take two parameters a callback function and array of dependency. use Effect hook will run only one time time if array of dependency is blank

//useRef --> useRef hook allows you to reference a value . it can be used to access DOM directly without rerendering of component;

//contextApi -->are used to pass data between components without passing props on each level. it creates a global variable that can be accesible from anywhere in component


                       

