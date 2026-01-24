import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DEEP_LEARNING_ROADMAP = {
  "id": "deep-learning",
  "title": "🧭 Deep Learning Roadmap",
  "description": "Learn neural networks, deep learning architectures, training pipelines, CNNs, RNNs, transformers, and build advanced AI models using TensorFlow/PyTorch.",
  "short_description": "Learn neural networks, deep learning architectures, training pipelines, CNNs, RNNs, transformers, and build advanced AI models using TensorFlow/PyTorch.",
  "prerequisites": ["Python programming", "Machine Learning fundamentals", "Linear Algebra & Calculus"],
  "estimated_hours": 180,
  "difficulty": "Advanced",
  "category": "Data Science & AI",
  "phases": [
    {
      "phase": 1,
      "title": "Neural Network Foundations",
      "goal": "Understand how neural networks work internally",
      "weeks": "Week 10-11",
      "topics": [
        "What is a neural network?",
        "Perceptron",
        "Activation functions: Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax",
        "Forward & Backpropagation",
        "Weighted sums",
        "Error/loss functions",
        "Gradient descent (revisited)",
        "Chain rule applied to networks",
        "Feedforward networks",
        "Multilayer Perceptron (MLP)"
      ],
      "practice": [
        "Implement perceptron manually",
        "Train a simple neural network in NumPy",
        "Build MLP for MNIST using PyTorch/TensorFlow"
      ],
      "resources": [
        "3Blue1Brown – Neural Networks",
        "StatQuest – Neural Networks"
      ]
    },
    {
      "phase": 2,
      "title": "Deep Learning Frameworks",
      "goal": "Learn the major frameworks used in industry",
      "weeks": "Week 11-12",
      "topics": [
        "PyTorch Basics: Tensors, Gradients (autograd), Model class, Training loop",
        "TensorFlow/Keras Basics: Sequential API, Functional API, Callbacks, Checkpoints",
        "Loss functions, Optimizers: SGD, Adam, RMSProp",
        "Batch vs epoch",
        "Learning rate optimization"
      ],
      "practice": [
        "Train MNIST classifier in PyTorch",
        "Train another version in Keras",
        "Compare accuracy & training speed"
      ],
      "resources": [
        "Aladdin Persson – PyTorch Tutorials",
        "TensorFlow Official"
      ]
    },
    {
      "phase": 3,
      "title": "Convolutional Neural Networks (CNNs)",
      "goal": "Learn and implement deep learning for images and vision",
      "weeks": "Week 12-14",
      "topics": [
        "What are CNNs?",
        "Convolution & filters",
        "Feature maps",
        "Pooling (max/avg)",
        "Padding & stride",
        "Flattening & fully connected layers",
        "LeNet-5, AlexNet, VGG16, ResNet, MobileNet",
        "Image Classification",
        "Object Detection (intro)",
        "Image Augmentation"
      ],
      "practice": [
        "Build CNN for CIFAR-10",
        "Implement data augmentation",
        "Train ResNet using pre-trained weights",
        "Compare training with and without augmentation"
      ],
      "resources": [
        "DeepLearning.ai — CNN Specialization",
        "Aladdin Persson – CNN Tutorials"
      ]
    },
    {
      "phase": 4,
      "title": "RNNs, LSTMs & NLP Basics",
      "goal": "Learn deep learning for text and sequence data",
      "weeks": "Week 14-15",
      "topics": [
        "RNN (Recurrent Neural Networks)",
        "Vanishing gradient problem",
        "LSTM (Long Short-Term Memory)",
        "GRU (Gated Recurrent Unit)",
        "Tokenization",
        "Embeddings: Word2Vec, GloVe",
        "Padding/truncation",
        "Sentiment analysis",
        "Text classification",
        "Next-word prediction"
      ],
      "practice": [
        "Train text classifier using LSTM",
        "Build sentiment analysis model",
        "Convert texts to embeddings & train simple RNN"
      ],
      "resources": [
        "CodeEmporium – RNN & LSTM Intuition",
        "DeepLearning.ai — NLP Basics"
      ]
    },
    {
      "phase": 5,
      "title": "Transformers & Modern DL",
      "goal": "Understand next-generation deep learning architectures",
      "weeks": "Week 15-17",
      "topics": [
        "Self-attention mechanism",
        "Multi-head attention",
        "Positional encoding",
        "Encoder–decoder architecture",
        "BERT, GPT, DistilBERT, T5",
        "Vision Transformers (ViT)",
        "Patches in ViT",
        "Attention for images"
      ],
      "practice": [
        "Use HuggingFace transformers",
        "Fine-tune BERT on a text dataset",
        "Run inference using pre-trained GPT models",
        "Train a small transformer for translation (optional)"
      ],
      "resources": [
        "Jay Alammar – Visualizing Transformers",
        "HuggingFace Tutorials"
      ]
    },
    {
      "phase": 6,
      "title": "Advanced Training Concepts",
      "goal": "Learn techniques used in real-world production models",
      "weeks": "Week 17-18",
      "topics": [
        "Learning rate schedulers",
        "Early stopping",
        "Dropout regularization",
        "Batch normalization",
        "Transfer learning",
        "Data augmentation techniques",
        "Weight initialization",
        "Overfitting vs underfitting",
        "Training curves analysis",
        "Parameter tuning"
      ],
      "practice": [
        "Tune CNN with learning rate scheduler",
        "Apply dropout & regularization",
        "Use transfer learning on ImageNet model",
        "Plot & analyze training curves"
      ],
      "resources": [
        "DeepLearning.ai — Optimization",
        "Aladdin Persson – Training Tricks"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "MNIST Digit Classifier",
      "description": "Build MLP for handwritten digit recognition",
      "technologies": ["PyTorch/TensorFlow", "MLP", "MNIST"],
      "type": "computer-vision",
      "difficulty": "Beginner"
    },
    {
      "name": "CIFAR-10 CNN Classification",
      "description": "CNN model for object classification on CIFAR-10",
      "technologies": ["CNN", "PyTorch", "CIFAR-10"],
      "type": "computer-vision",
      "difficulty": "Intermediate"
    },
    {
      "name": "Sentiment Analysis using LSTM",
      "description": "LSTM model for text sentiment classification",
      "technologies": ["LSTM", "NLP", "PyTorch"],
      "type": "nlp",
      "difficulty": "Intermediate"
    },
    {
      "name": "Fine-Tune BERT for Text Classification",
      "description": "Fine-tune pre-trained BERT model on custom dataset",
      "technologies": ["BERT", "HuggingFace", "Transformers"],
      "type": "nlp",
      "difficulty": "Advanced"
    },
    {
      "name": "Transfer Learning using ResNet50",
      "description": "Use transfer learning for custom image classification",
      "technologies": ["ResNet", "Transfer Learning", "PyTorch"],
      "type": "computer-vision",
      "difficulty": "Intermediate"
    },
    {
      "name": "Custom Transformer Implementation",
      "description": "Build and train a small transformer from scratch",
      "technologies": ["Transformers", "PyTorch", "Self-Attention"],
      "type": "advanced",
      "difficulty": "Expert"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn",
      "example": "Watch neural network/CNN/NLP lessons"
    },
    {
      "time": "30-90 mins",
      "task": "Practice",
      "example": "Train deep learning models"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build CNN/LSTM/transformer models"
    }
  ],
  "tools": [
    "PyTorch",
    "TensorFlow/Keras",
    "HuggingFace Transformers",
    "Jupyter Notebook",
    "Google Colab / Kaggle Notebook",
    "CUDA (GPU training)"
  ],
  "outcome": "By the end of this roadmap, you'll understand neural networks deeply, build CNN, RNN, LSTM, and transformer models, use PyTorch & TensorFlow confidently, fine-tune pre-trained NLP & vision models, and be ready for Production & MLOps.",
  "career_paths": [
    "Deep Learning Engineer",
    "AI Research Scientist",
    "Computer Vision Engineer",
    "NLP Engineer",
    "Machine Learning Engineer",
    "AI Product Manager",
    "ML Research Engineer"
  ]
};

const DeepLearningRoadmap = () => {
  return <RoadmapLayout data={DEEP_LEARNING_ROADMAP} roadmapId={DEEP_LEARNING_ROADMAP.id} />;
};

export default DeepLearningRoadmap;
