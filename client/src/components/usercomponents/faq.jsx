import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question:
        "Does BoxCar own the cars I see online or are they owned by others?",
      answer:
        "Cras vitae se nunc orci. Purus amet tortor non at pharetra ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec. Sagittis, id volutpat erat vel.",
    },
    {
      question: "How do you choose the cars that you sell?",
      answer: "Answer to this question will go here.",
    },
    {
      question: "Can I save my favorite cars to a list I can view later?",
      answer: "Answer to this question will go here.",
    },
    {
      question:
        "Can I be notified when cars I like are added to your inventory?",
      answer: "Answer to this question will go here.",
    },
    {
      question:
        "What tools do you have to help me find the right car for me and my budget?",
      answer: "Answer to this question will go here.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
        background: "#F9FBFC",
        padding: "20px 40px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div
            onClick={() => toggleFAQ(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              padding: "10px 0",

              fontWeight: activeIndex === index ? "bold" : "normal",
            }}
          >
            <span>{faq.question}</span>
            <span>{activeIndex === index ? "—" : "+"}</span>
          </div>

          {activeIndex === index && (
            <p style={{ padding: "10px 0", color: "#555" }}>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
