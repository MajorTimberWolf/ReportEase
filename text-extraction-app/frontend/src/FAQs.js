import React from 'react'

const FAQs = () => {
    return (
        <div id="FAQ" className="bg-gray-900 px-36 py-10">
            <h2 className="text-3xl text-white mb-6">Frequently asked questions</h2>
            <div>
                {faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </div>
        </div>
    );
}

export default FAQs


const faqs = [
    {
        question:
            " How does the AI model determine which IPC and CrPC charges to suggest?",
        answer:
            "The AI model analyzes the content of FIRs and CCTNS reports using natural language processing to identify relevant legal terms and contextual information. It then cross-references this data with a legal database to suggest the most applicable IPC and CrPC charges.",
    },
    {
        question:
            " Can the AI handle FIRs and CCTNS reports that are handwritten or in non-digital formats?",
        answer:
            "Yes, our AI model includes OCR (Optical Character Recognition) capabilities to convert non-digital documents into a machine-readable format before analysis.",
    },
    {
        question:
            "What level of accuracy does the AI model have in suggesting charges?",
        answer:
            "Our AI model is continuously trained on a wide range of legal documents to improve its accuracy. While it provides a high level of precision, we recommend all suggestions be reviewed by a legal professional.",
    },
    // Add more FAQ items here
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div  className="border-b border-gray-700">
            <button
                className="flex justify-between items-center w-full py-5 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-xl text-white">{faq.question}</span>
                <span className="text-xl text-white">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen && (
                <div className="pb-5 text-white text-opacity-90">{faq.answer}</div>
            )}
        </div>
    );
};
