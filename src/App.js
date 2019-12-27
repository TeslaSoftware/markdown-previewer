import React from 'react';
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
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleTextAreaChange(event) {
    this.setState({
      msg: event.target.value
    });    
  }

  render(){
    return (
      <div>
        <div className="App">
          <TextEditorWindow msg={this.state.msg} handleTextAreaChange={this.handleTextAreaChange}/>          
          <PreviewWindow msg={this.state.msg} />
        </div>
        <footer>Created by Sebastian Tysler</footer>
      </div>
    );
  }  

}


function WindowHeader(props) {
  return <div className="window-header">{props.title}</div>;
}


function TextEditorWindow(props){
  return (
    <div className="window">
      <WindowHeader title="Text Editor"/>
      <div className="window-content" id="editor-content">
        <textarea id="editor" value={props.msg} cols="50" rows="20" onChange={props.handleTextAreaChange} >
        </textarea>
      </div>
    </div>
  );
}


function PreviewWindow(props){
  return (
    <div className="window">
      <WindowHeader title="Previewer"/>
      <TextPreview msg={marked(props.msg)}/>
    </div>
  );  
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
