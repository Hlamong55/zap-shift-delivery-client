import { useState } from "react";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";

const faqs = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine."
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, it is adjustable and suitable for most ages and body types."
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Many users report improved posture and reduced back pain after consistent use."
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include smart sensors that vibrate when you slouch."
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can subscribe to email notifications for restock alerts."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className=" py-16">
      <div className="max-w-5xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-secondary">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-center max-w-3xl mx-auto  text-text mt-2">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        {/* FAQ Items */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border shadow-sm transition-all ${
                openIndex === index
                  ? "bg-teal-50 border-teal-400"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left font-semibold"
              >
                {faq.question}

                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-800 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 mx-auto transition">
            See More FAQ’s
            <span className="bg-black text-white p-2 rounded-full">
              <FaArrowRight />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
