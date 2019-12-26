import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import marked from 'marked';

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
//set options for marked.js library to render line breaks
marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
});


class App extends React.Component{ 
  

  constructor(props){
    super(props);
    this.state = {
      msg : placeholder
    }
  }

  render(){
    return (
      <div className="App">
        <TextEditorWindow msg="First window" msg={this.state.msg} />
        <PreviewWindow msg="Second window" msg={ marked(this.state.msg)}/>
      </div>
    );
  }  
}

function WindowHeader(props) {
  return <div className="window-header">{props.title}</div>;
}

class TextEditorWindow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg : props.msg
    }
  }

  render(){
    return (
      <div>
        <WindowHeader title="Text Editor"/>
        <div className="window-content">
          <textarea id="editor" value={this.state.msg} cols="50" rows="20">
          </textarea>
        </div>
      </div>
    );
  }
}

class PreviewWindow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg : props.msg
    }
  }

  render(){
    return (
      <div>
        <WindowHeader title="Previewer"/>
        <TextPreview msg={this.props.msg}/>
      </div>
    );
  }
}

function TextPreview(props){
    return (
      <div className="window-content" id="preview" dangerouslySetInnerHTML = {
            { __html: props.msg }
          }
      />
    )
}

export default App;
