import React from "react";
import "../CSS/About.css";
import People from "./People";
import Mohan from "../Images/mohan.jpg";
import Prachi from "../Images/prachi.jpg";
import Prashant from "../Images/prashant.jpg";
import Paras from "../Images/paras.jpg";
import Nirbhay from "../Images/nirbhay.jpg";
import Monika from "../Images/monika.jpg";
import Aishwarya from "../Images/aishwarya.jpg";
import Manan from "../Images/manan.jpg";
import { saveAs } from "file-saver"
import pdf from "../File/Natural Gas Price Forecast.pdf";

export const About = () => {
  const aboutUs = [
    {
      pic: Manan,
      name: "Manan Mehrotra",
      about:
        "I am Manan Mehrotra, born and brought up in Moradabad.I know python as a progamming language.  I am currently in the final year of the Moradabad Institute of Science and Technology. I believe that success comes to those who are determined enough. The right kind of attitude with hard work and determination is required for a balanced life and to achieve greater heights in life. I am beginner in data science and data analytics.",
    },
    {
      pic: Mohan,
      name: "Mohan Krishna Gupta",
      about:
        "I am Mohan Krishna Gupta. I am a person with a lot of enthusiasm to learn new things and I follow the motto “Live Life to the Fullest”. I mainly believe that hard work really matters in our progress. With my hard work I am one in the top student in the college.I am pursuing final year B.Tech. in the department of Computers Science Engg., in MIT Moradabad. I am interested in Data Science and have made many projects which help me in improving my skills.",
    },
    {
      pic: Nirbhay,
      name: "Nirbhay Arora",
      about:
        "My name is Nirbhay Arora. I'm a Computer Science undergraduate from MIT College and I'm a technology enthusiast. As a tech-geek and quick, I built many projects using the Machine Learning as a tech stack. During my internship as a Software Engineer Intern at Silihat, where I majorly worked on Python,Nodejs, I furnished my problem-solving skills and greatly improved my coding style.Currently I am working on a position of Associate Software Engineer at a renowned IT company.",
    },
    {
      pic: Paras,
      about:
        "I am Paras Pandey. Basically, I belong to Uttrakhand. I have been living in Moradabad for 20+ years now.I choose to pursue higher studies in Bachelor of Technolgy in CS major because of the enthusiasm to learn new things. Post that, my internship experience and other practical projects in the college further boosted my interest in Web Development as a full-time career option.I am also inclined towards gaming.Currently I am working as Softwrae Engineer in a renowned IT company for about 6 months.",
      name: "Paras Pandey",
    },
    {
      pic: Prachi,
      about:
        "Hi, I am Prachi Chauhan. I am from Moaradabad. I completed my Bachelor of Technology degree in 2022 from MIT Moradabad with a percentage of 81.2.I got hired by a renowned IT company. I have been working with the company where I have learned the ins and outs of Google Cloud Platform.",
      name: "Prachi Chauhan",
    },
    {
      pic: Prashant,
      about:
        "I have done my schooling from Chandausi. For my graduation, I chose B.tech at MIT. It was a very enriching experience at the College as not only I was actively involved in practical projects, but also got opportunities to participate in a number of extra-curricular activities.Right now I am working as an Software Engineer at Nagarro.",
      name: "Prashant Bansal",
    },
  ];

  const aboutMentors = [
    {
      pic: Aishwarya,
      name: "Aishwarya Gupta",
      about:
        "Aishwarya Gupta here,experienced programmer with several successful projects under my belt. I’d say my portfolio introduces me better than my words do, so if want we can look at it together, and I can tell you about the principal projects I engineered over the years. I’ve worked with the top Indian MNCs in my 3 years of experience, climbing the career ladder, learning the ins and outs of programming.Currently Working for another renowned IT company on the position of Senior RPA developer.",
    },
    {
      pic: Monika,
      about:
        "Working as a Front End developer with Nagarro Software with a total experience to 8+years. I am working as a hybrid app developer right now for e-Commerce domain client. Keen to explore new dimensions of Javascript in both server side and client side.Eager to work in technologies like OOJS, Node JS, React, HTML and contribute to the magical world of computer science.",
      name: "Monika Pant",
    },
  ];

  const downloadPDF = () => {
    // // using Java Script method to get PDF file
    // fetch("../File/Natural Gas Price Forecast.pdf").then((response) => {
    //   response.blob().then((blob) => {
    //     // Creating new object of PDF file
    //     const fileURL = window.URL.createObjectURL(blob);
    //     // Setting various property values
    //     let alink = document.createElement("a");
    //     alink.href = fileURL;
    //     alink.download = "../File/Natural Gas Price Forecast.pdf";
    //     alink.click();
    //   });
    // });
      saveAs(
        "../File/Natural Gas Price Forecast.pdf",
        "Natural_Gas_Price_Forecast.pdf"
      );
    };
  return (
    <div className="about_section">
      <div className="about_project">
        <h4 className="text-center mb-3">
          Futurists A Natural Gas Price Prediction Project
        </h4>
        <div className="project_content">
          <p>
            Natural gas is widely used in energy generation, transportation,
            commercial, and household sectors, as well as in energy-intensive
            industries such as chemical, iron and steel manufacturing.Natural
            gas is one of the most commonly used non-renewable hydrocarbons. Its
            price influences almost every household, directly or indirectly.
          </p>
          <p>
            As almost every non-renewable energy source, it releases carbon
            dioxide when burned. Therefore, one of the biggest influencing
            factors of natural gas prices is green energy – or renewable energy
            (like solar power, wind power, etc.)
          </p>
          <p>
            Natural gas is one of the most abundant sources of energy. Being
            treated as a commodity, natural gas price is constantly subject to
            fluctuations. Forecasting energy prices has become one of the major
            goals in the industry due to its potential economical benefits. An
            accurate natural gas price prediction model is useful for
            manufacturers in managing energy andmaking decisions on future
            contracts. Traders who seek to reduce risk exposure can also take
            advantage of a price prediction tool for their bidding strategies.
            The purpose of <strong>Futurists</strong> is to analyze historical
            information on the variables that potentially have a high impact on
            the supply and demand for natural gas, as well as the price. The
            analysis is conducted using a novel data mining algorithm that is
            capable of simultaneously removing noise and performing regression.
          </p>
          <h5>
            <u> Our Approach</u>
          </h5>
          <p>
            <strong>Futurists</strong> forecast Natural Gas Price in the
            international Market for the peroid 2021 - 2026. The historical data
            is extracted programmatically from public websites and models are
            build upon the data. <strong>Futurists</strong> work presents the
            output with the time-stamps in MS Excel CSV format. Model that{" "}
            <strong>Futurists</strong> implemented contains comprehensive
            explanationod data using EDA, trend analysis, assumptions, data
            cleaning and validation, data augmentation. This work presents a
            state-of-the-art survey of published papers that forecast natural
            gas production, consumption or demand, prices and income elasticity,
            market volatility and hike in prices. New models and techniques that
            have recently been applied in the field of natural gas forecasting
            have discussed with highlights on various methodologies, their
            specifics, data type, data size, data source, results and
            conclusions. Moreover, we undertook the difficult task of
            classifying existing models that have been applied in this field by
            giving their performance for instance. Our objective is to provide
            the near to accurate prices of natural gas in upcoming years. It can
            help individuals on both the supply and demand sides to reduce
            associated risk by better anticipating future changes in prices and
            by being prepared and acting on time to optimize their participation
            and behaviour in the relevant market via positive or negative
            storage.This work will help future researchers in the area of
            forecasting no matter the methodological approach and nature of
            energy source used.Moreover, government officials can use such
            formation for larger-scale planning as they can anticipate price
            swings.
          </p>
          {/* <h6>Download the pdf for graphical view of approach :</h6> */}

          {/* <button
            type="button"
            onClick={() => downloadPDF()}
            className={`btn btn-outline-primary`}
          >
            Download PDF
          </button> */}
          {/* <a href="../File/Natural Gas Price Forecast.pdf" download="ppt.pdf" >  Download PDF</a> */}
        </div>
      </div>
      <hr />
      <h2 className="mt-4 mb-3">About US</h2>
      <div className="about_us">
        {aboutUs.map((user, i) => {
          return <People data={user} key={i} index={i} />;
        })}
      </div>
      <hr />
      <h2 className="mt-4 mb-3">Our Mentors</h2>
      <div className="about_mentor">
        {aboutMentors.map((user, i) => {
          return <People data={user} key={i} index={i} />;
        })}
      </div>
    </div>
  );
};
