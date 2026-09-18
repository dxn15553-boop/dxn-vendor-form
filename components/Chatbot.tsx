
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface chatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;

}
const QUICK_PROMPTS = [
    "🌿 Products for Immunity",
    "🍄 What is Ganoderma?",
    "🏭 Factory & Certifications",
    "🤝 How to register as a Vendor?"
];


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>('')
    const [messages, setMessages] = useState<chatMessage[]>(
        [
            {
                id: '1',
                sender: 'bot',
                text: 'Hello! Welcome to DXN India. How can I assist you today? You can choose a quick topic below or type any question.',
            },

        ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);
    return (
        <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end'>

            <button onClick={() => setIsOpen(prev => !prev)}
                className='w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center relative group'
                aria-label="Toggle DXN Assistant"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-7 h-7 transition-transform group-hover:scale-110 " />
                )}

                {!isOpen && (
                    <span className="absolute -top1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />

                )}




            </button>
        </div>
    );
};