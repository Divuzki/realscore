# REALSCORE - Automated Text Scoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

REALSCORE is a privacy-focused, browser-based automated text scoring system that provides real-time feedback on writing quality. Using TensorFlow.js, it analyzes text directly in your browser without sending data to any server.

## 🚀 Features

- **Real-time Analysis**: Get instant feedback as you write
- **Complete Privacy**: All processing happens in your browser
- **Multiple Scoring Dimensions**:
  - Grammar and syntax
  - Content coherence
  - Vocabulary richness
  - Topic relevance
  - Overall quality score
- **Rich Text Editor**: Full formatting capabilities
- **Data Persistence**: Auto-save and local storage
- **Export Options**: Save your work in multiple formats
- **Responsive Design**: Works on desktop and mobile
- **Offline Support**: Continue working without internet

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Text Processing**: TensorFlow.js, Universal Sentence Encoder
- **State Management**: React Context API
- **Storage**: LocalForage
- **Text Editor**: React Quill
- **Visualization**: Chart.js with React Chartjs 2
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Requirements

- Node.js 18.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 4GB RAM minimum (8GB recommended)
- 500MB free disk space for model storage

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/divuzki/realscore.git
   cd realscore
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Usage

1. **Create a New Document**:
   - Click the "Create New Document" button
   - Start typing in the rich text editor

2. **View Analysis**:
   - See real-time scores in the sidebar
   - Review detailed breakdowns for each metric
   - Get suggestions for improvement

3. **Save and Export**:
   - Documents auto-save to local storage
   - Export to PDF, DOCX, or TXT formats
   - Access previous documents from the dropdown menu

## 🔍 Scoring Metrics

### Grammar & Style (0-10)

- Sentence structure
- Punctuation
- Subject-verb agreement
- Writing mechanics

### Coherence & Organization (0-10)

- Logical flow
- Paragraph structure
- Transitions
- Overall organization

### Vocabulary Usage (0-10)

- Word choice
- Vocabulary diversity
- Language sophistication
- Context appropriateness

### Topic Relevance (0-10)

- Content focus
- Main idea development
- Supporting details
- Topic consistency

## 🔒 Privacy Features

- All text analysis happens client-side
- No data sent to external servers
- Local storage encryption
- Optional data purging
- No analytics or tracking

## 🛠️ Development

### Project Structure

```bash
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
├── utils/         # Utility functions
└── main.tsx       # Application entry point
```

### Key Components

- `TextEditor`: Rich text editing interface
- `ScoreSidebar`: Real-time scoring display
- `ScoreRadarChart`: Score visualization
- `ModelLoader`: ML model initialization

### Custom Hooks

- `useTensorflowModels`: ML model management
- `useDocumentStorage`: Local storage operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow.js team for browser ML capabilities
- React team for the excellent framework
- Open source community for various tools and libraries

## ⚠️ Known Limitations

- Initial model loading may take time
- Heavy CPU usage during analysis
- Limited to modern browsers
- Requires JavaScript enabled

---

Built with ❤️ using React and TensorFlow.js
