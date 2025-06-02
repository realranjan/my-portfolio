import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const Work = () => {
  const [showMore, setShowMore] = useState(false)
  
  const projects = [
    {
      title: "Automated Data Query and Retrieval System",
      url: "https://github.com/realranjan/automated-data-query-system",
      description: "A system that lets users query CSV data in MongoDB using natural language, powered by Google Gemini API for dynamic query generation and retrieval."
    },
    {
      title: "DOCASSIST-AI",
      url: "https://github.com/realranjan/DOCASSIST-AI",
      description: "DocAssist AI is a sophisticated medical report analysis system that leverages machine learning to analyze blood test reports and provide intelligent medical recommendations"
    },
    {
      title: "Flipkart Product Categorization",
      url: "https://github.com/realranjan/Flipkart_product_categorization",
      description: "My solution to the Ecommerce Product Categorization challenge"
    },
    {
      title: "Nutrition Dataset Analysis",
      url: "https://github.com/realranjan/data_analysison_nutritiondataset",
      description: "Performed data analysis on a nutrition dataset to identify key trends and insights related to dietary habits and nutritional content"
    }
  ]
  
  const hiddenProjects = [
    {
      title: "License Plate Recognition with AI",
      url: "https://github.com/realranjan/licence-plate-recognition-using-aiml",
      description: "License plate recognition system using AI/ML techniques for automated identification"
    },
    {
      title: "Titanic Survival Prediction with ML",
      url: "https://github.com/realranjan/TITANIC-SURVIVAL-PREDICTION-USING-MACHINE-LEARNING",
      description: "Can machine learning predict who survived the Titanic? This project investigates that question using passenger data and various classification algorithms"
    }
  ]

  return (
    <section className="space-y-4 opacity-0 animate-[fadeIn_0.6s_ease-out_0.7s_forwards]">
      <h2 className="text-xs sm:text-sm font-medium text-gray-500">
        SELECTED WORK
      </h2>
      
      <div className="space-y-3">
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
        
        <div className={`space-y-3 transition-all duration-300 ease-in-out ${showMore ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}>
          {hiddenProjects.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </div>
        
        <button 
          className="text-sm text-gray-500 hover:text-orb-red transition-all duration-300 mt-4 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-orb-red hover:after:w-full after:transition-all after:duration-300"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show Less' : 'See More'}
        </button>
      </div>
    </section>
  )
}

const ProjectItem = ({ project }) => (
  <a 
    href={project.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group block p-2 sm:p-3 -mx-3 rounded-lg transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h3 className="text-sm sm:text-base font-medium group-hover:text-orb-red transition-colors">
          {project.title}
        </h3>
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orb-red" />
      </div>
    </div>
    <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
      {project.description}
    </p>
  </a>
)

export default Work 