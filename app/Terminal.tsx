import React from "react";
import { ReactTerminal, TerminalContext } from "react-terminal";

function Terminal() {
    const { setBufferedContent, setTemporaryContent } = React.useContext(TerminalContext);
    const [theme, setTheme] = React.useState("matrix");
    const [controlBar, setControlBar] = React.useState(true);
    const [controlButtons, setControlButtons] = React.useState(true);
    const [prompt, setPrompt] = React.useState("[@dush/web/undefined]$ ");
  
    const commands = {
      help: (
        <span>
            <br/>
            <strong>about</strong> - About me. <br />
        <strong>projects</strong> - My projects. <br />
        <strong>contact</strong> - Contact me. <br /><br />
          <strong>clear</strong> - clears the console. <br />
          <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
          terminal. Allowed themes - light, dark, material-light, material-dark,
          material-ocean, matrix and dracula. <br />
          bar. <br />
        
        </span>
      ),
  
      change_prompt: (prompt: string) => {
        setPrompt(prompt);
      },
  
      change_theme: (theme: string) => {
        const validThemes = [
          "light",
          "dark",
          "material-light",
          "material-dark",
          "material-ocean",
          "matrix",
          "dracula",
        ];
        if (!validThemes.includes(theme)) {
          return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
        }
        setTheme(theme);
      },
  
      toggle_control_bar: () => {
        setControlBar(!controlBar);
      },
  
      toggle_control_buttons: () => {
        setControlButtons(!controlButtons);
      },
  
      evaluate_math_expression: async (expr: string) => {
        const response = await fetch(
          `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
        );
        return await response.text();
      },

      wait: async (timeout: any) => {
        setTemporaryContent("Waiting...");
        await new Promise(resolve => setTimeout(() => {
            resolve(void 0);
        }, parseInt(timeout) * 1000));
        return 'Over!';
      },

      count_to: async (nb: any) => {
        setTemporaryContent("Counting...");
        nb = parseInt(nb);
        await Promise.all(
          new Array(nb).fill({}).map((value, index) => new Promise((resolve) => {
            const timer = setTimeout(() => {
              setBufferedContent((previous) => (<>
                {previous}
                <span>
                    {index + 1}
                </span>
                {index + 1 < nb ? <br/> : ''}
              </>));
              clearTimeout(timer);
              resolve(void 0);
            }, index * 1000);
          }))
        );
        return <><br/>Finished</>;
      },
      
      about: (<span><br />Hello, I'm [<strong>Dushime Valentin</strong>]<br/>
      Software Engineer | Machine Learning Enthusiast | AI Aficionado<br/><br/>
      
      🌟 Passionate about transforming ideas into elegant code and solving complex problems with technology.<br/><br/>
      
      <strong>What I Bring to the Table:</strong><br/><br />
      Expertise in Software Engineering: With a solid background in software development, I excel in crafting clean, efficient, and scalable code. I've honed my skills in a variety of programming languages, frameworks, and technologies.<br /><br />
      Machine Learning Maven: Machine learning is not just a buzzword for me; it's a passion. I've delved into the depths of neural networks, deep learning, natural language processing, and computer vision. Whether it's predicting trends, optimizing processes, or making predictions, I'm up for the challenge.<br /><br />
      AI Enthusiast: Artificial intelligence is more than just algorithms; it's the key to unlocking the potential of our digital world. I'm dedicated to exploring the frontiers of AI, from developing smart chatbots to creating intelligent recommendation systems.<br /><br />
      Full-Stack Explorer: I'm not just confined to one layer of the tech stack. From front-end design that captivates users to back-end logic that powers applications, I'm well-versed in the entire development cycle.<br /><br />
      Problem-Solver: My engineering mindset thrives on solving real-world problems. Whether it's optimizing business processes, enhancing user experiences, or tackling complex data analysis, I relish the opportunity to find innovative solutions.<br /><br />
      Collaborative Team Player: I believe in the power of collaboration. Working closely with cross-functional teams, I've learned that the best solutions often arise from diverse perspectives and collective creativity.<br /><br />
      Lifelong Learner: The tech world never stops evolving, and neither do I. I'm committed to continuous learning, staying updated with the latest trends, and constantly improving my skills.<br/></span>),

      projects: (
        <span>
            <br/>
            <strong>My Portfolio Highlights:</strong><br/><br/>
            <a href="http://www.cleankigali.kigalicity.gov.rw/">CleanKigali</a>: A Smart Waste Management IoT solution<br/><br/>
            <a href="https://scriptylabs.rw/">ScriptyLabs</a>: We design, develop and host web apps, We sell .rw domains we maintain and consult your already built software<br/><br/>
            <a href="https://abacu.rw">ABACU</a>: Reunite with the loved ones by sharing their stories<br/><br/>
            <a href="https://invictus.rmf.gov.rw/">Invictus RMF</a>: Invictus software for Road Maintenance Fund<br/><br/>
            <a href="https://ismis.minisports.gov.rw/admin/index.php/">Minisports SMIS</a>: MINISPORTS MIS renewed<br/><br/>
            <a href="https://github.com/valentindush/hands-on-ML">Hands on ML Projects</a>: Machine learning projects .pynb notebooks<br/><br/>
            <a href="https://github.com/valentindush/advanced-computer-vision-projects/tree/master/projects/">Advanced computer vision projects</a>: built with mediapipe<br/><br/>
            <a href="https://dush-forms.vercel.app/">Dush forms</a>: A simple web based forms app<br/><br/>
            <a href="https://womenforwomenrwanda.org/">WFW - Rwanda</a>: Women for Women Rwanda Website<br/><br/>
            <a href="https://github.com/valentindush/News-svelte">News - (News API)</a>: News web built in svelte using news API<br/><br/>
        </span>
      ),
      contact: (
        <span>
            <br/>
            I'm always excited to connect with fellow tech enthusiasts, potential collaborators, or anyone who shares a passion for the limitless possibilities of programming, machine learning, and AI. Feel free to reach out to me!<br/><br/>
            <strong>Contact me:</strong><br/><br/>
            Email: <a href="mailto:codesvalentin@gmail.com">codesvalentin@gmail.com</a><br/>
            Linkedin: <a href="https://www.linkedin.com/in/valentin-dushime-0b1b3a1a0/">Valentin Dushime</a><br/>
            GitHub: <a href="https://github.com/valentindush">valentindush</a><br/>

        </span>
      )
    };
  
    const welcomeMessage = (
      <span>
        Hello, I'm <strong>[Dushime Valentin]</strong><br/>
        Software Engineer<br/><br/>     
        Type "help" for all available commands. 
        
        <br /><br/>
        DON'T BE A NERD - BE A <strong>GEEK</strong>
        <br /><br/>
      </span>
    );

    return (<ReactTerminal
      prompt={prompt}
      theme={theme}
      showControlBar={controlBar}
      showControlButtons={controlButtons}
      welcomeMessage={welcomeMessage}
      commands={commands}
      defaultHandler={(command: any, commandArguments: any) => {
        return `${command} command not found`;
      }}
    />);
}

export default Terminal;