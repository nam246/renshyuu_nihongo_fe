'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Brain, BookOpen, Layers, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Level, Flashcard, Deck } from '@/types/types';
import { ItemLevelBadge } from '@/components/entities';

// --- Components ---

export default function FlashcardApp({ decks }: { decks: Deck[] }) {
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

    if (selectedDeck) {
        return (
            <StudySession
                deck={selectedDeck}
                onExit={() => setSelectedDeck(null)}
            />
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                    <DeckCard
                        key={deck.id}
                        deck={deck}
                        onClick={() => setSelectedDeck(deck)}
                    />
                ))}
            </div>
        </div>
    );
}

function DeckCard({ deck, onClick }: { deck: Deck; onClick: () => void }) {
    const Icon = deck.type === 'Kanji' ? Brain : deck.type === 'Grammar' ? BookOpen : Layers;

    return (
        <Card
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-primary/50"
            onClick={onClick}
        >
            <CardHeader>
                <ItemLevelBadge level={deck.level} />
                <CardTitle>{deck.title}</CardTitle>
                <CardDescription>{deck.description}</CardDescription>
                <CardAction><Icon className="w-5 h-5 text-primary" /></CardAction>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="pt-4 flex items-center justify-between text-sm text-muted-foreground border-t">
                    <span>{deck.count} cards</span>
                    <span className="font-medium text-primary group-hover:translate-x-1 transition-transform">Start &rarr;</span>
                </div>
            </CardContent>
            <CardFooter>
                
            </CardFooter>
        </Card>
    );
}

function StudySession({ deck, onExit }: { deck: Deck; onExit: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

    // Preload next/prev if needed? Not strictly necessary for this simple version.

    const currentCard = deck.cards[currentIndex];
    // Calculate progress properly: (currentIndex) / total if working towards end, 
    // or (currentIndex + 1) / total to verify progress visualization.
    const progress = ((currentIndex + 1) / deck.count) * 100;

    const handleNext = () => {
        if (currentIndex < deck.cards.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            // Small timeout to allow flip reset to be visually imperceptible if needed, 
            // but here we just switch card.
            setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
        }
    };

    const handleReset = () => {
        setIsFlipped(false);
        setCurrentIndex(0);
        setDirection(0);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                if (!isFlipped && e.key === ' ') {
                    setIsFlipped(true);
                } else if (currentIndex < deck.count - 1) {
                    handleNext();
                } else if (currentIndex === deck.count - 1 && isFlipped && e.key === 'ArrowRight') {
                    handleReset();
                }
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                setIsFlipped(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, isFlipped, deck.count]);

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={onExit} className="gap-2 pl-0 hover:pl-2 transition-all">
                    <ChevronLeft className="w-4 h-4" /> Back to Decks
                </Button>
                <div className="flex flex-col items-end">
                    <span className="font-medium">{deck.title}</span>
                    <span className="text-xs text-muted-foreground">{currentIndex + 1} / {deck.count}</span>
                </div>
            </div>

            <Progress value={progress} className="h-2 transition-all duration-500" />

            {/* Card Area */}
            <div className="relative min-h-[400px] perspective-1000">
                <div
                    className={cn(
                        "w-full h-full absolute inset-0 transition-transform duration-500 transform-style-3d cursor-pointer shadow-xl rounded-2xl border bg-card",
                        isFlipped ? "rotate-y-180" : ""
                    )}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-accent/20 rounded-2xl">
                        <Badge variant="outline" className="mb-8">Front</Badge>
                        <h2 className="text-6xl font-bold text-center mb-8">{currentCard.front}</h2>
                        <p className="text-muted-foreground animate-pulse text-sm mt-auto">Click to flip</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-card bg-gradient-to-bl from-background to-primary/5 rounded-2xl">
                        <Badge variant="outline" className="mb-8">Back</Badge>
                        <div className="text-center space-y-4 w-full">
                            {currentCard.reading && (
                                <p className="text-2xl text-primary font-medium">{currentCard.reading}</p>
                            )}
                            <h3 className="text-4xl font-bold mb-6">{currentCard.meaning}</h3>

                            {(currentCard.example) && (
                                <div className="mt-8 pt-6 border-t w-full text-left bg-muted/30 p-4 rounded-lg">
                                    <p className="text-lg mb-1 font-medium">{currentCard.example}</p>
                                    <p className="text-sm text-muted-foreground">{currentCard.exampleMeaning}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="w-12 h-12 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                    variant="outline"
                    className="h-12 px-8 gap-2 min-w-[140px]"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <RotateCcw className="w-4 h-4" />
                    Flip
                </Button>

                <Button
                    variant={currentIndex === deck.count - 1 ? "secondary" : "default"}
                    size="icon"
                    onClick={currentIndex === deck.count - 1 ? handleReset : handleNext}
                    className="w-12 h-12 rounded-full"
                >
                    {currentIndex === deck.count - 1 ? (
                        <RotateCcw className="w-5 h-5" />
                    ) : (
                        <ChevronRight className="w-5 h-5" />
                    )}
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4">
                Keyboard: arrows to navigate • space/up/down to flip
            </div>
        </div>
    );
}
