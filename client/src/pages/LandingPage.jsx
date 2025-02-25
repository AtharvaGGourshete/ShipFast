import React, { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// System message for the AI assistant
const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm the ShipFast Assistant! Ask me anything about our shipping services!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    setError(null);

    await processMessageToChatGPT(newMessages);
  };

  // Modify the processMessageToChatGPT function in your LandingPage.jsx

  async function processMessageToChatGPT(chatMessages) {
    try {
      let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
        return { role: role, content: messageObject.message };
      });

      // Store your API key in .env file as VITE_API_KEY
      // This is still not secure for production, but better than hardcoding
      const chatgay = import.meta.env.VITE_API_KEY;

      if (!chatgay) {
        throw new Error(
          "API key not found. Please check your environment variables."
        );
      }

      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [systemMessage, ...apiMessages],
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${chatgay}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        },
      ]);
      
    } catch (error) {
      console.error("Error processing message:", error);
      setError(
        error.message || "Failed to get a response. Please try again later."
      );
      // Add the error message to the chat
      setMessages([
        ...chatMessages,
        {
          message:
            "Sorry, I'm having trouble connecting. Please try again in a moment.",
          sender: "ChatGPT",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  const { resolvedTheme } = useTheme();
  const [shadowColor, setShadowColor] = useState("white");
  const [date, setDate] = useState(null);

  useEffect(() => {
    setShadowColor(resolvedTheme === "dark" ? "white" : "black");
  }, [resolvedTheme]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
        rel="stylesheet"
      />

      <div className="relative min-h-screen bg-[#161616] flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <div className="relative text-center text-white py-32 font-quicksand">
          <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Ship{" "}
            <LineShadowText
              className="italic text-green-500"
              shadowColor={shadowColor}
            >
              Fast
            </LineShadowText>
          </h1>
          <p className="text-lg mt-4 text-gray-300">Speed You Can Trust!</p>
          <span className="tracking-wide text-2xl">
            Reliable. Efficient. Delivered.
          </span>
          <p className="tracking-wide text-xl font-raleway max-w-4xl mx-auto mt-7">
            ShipFast Logistics ensures fast, reliable global deliveries with
            guaranteed on-time shipping. Trusted by businesses worldwide, we
            prioritize efficiency, precision, and customer satisfaction. Backed
            by successful testimonials, our seamless logistics services make
            shipping hassle-free. Choose ShipFast for speed, reliability, and
            excellence in every delivery.
          </p>
          <div className="flex flex-wrap gap-5 justify-center text-black items-center">
            <Button className="bg-green-500 text-black mt-3 hover:bg-white hover:text-black">
              Set up your first delivery
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground mt-3"
                  )}
                >
                  <CalendarIcon className="mr-2 text-black" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-black">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto bg-[#141414] text-white p-0 border-0"
                align="center"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full max-w-5xl mt-10 bg-[#161616] text-white font-quicksand rounded-xl p-10 mb-10 shadow-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:text-green-500">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:text-green-500">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
                Yes. It comes with default styles that match the other
                components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:text-green-500">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mb-5 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-100 transition">
          Chat with our AI assistant
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-5xl p-7 bg-green-400 rounded-lg shadow-2xl text-2xl border ">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-3xl font-bold tracking-tight text-gray-800 ">ShipFast Assistant</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 text-sm">
            Ask any questions about our shipping services.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="relative h-[500px] w-full z-30 rounded-lg shadow-inner border">
            <MainContainer className="rounded-md overflow-hidden h-full p-6">
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={isTyping ? <TypingIndicator content="Assistant is typing" /> : null}
                >
                  {messages.map((message, i) => (
                    <Message key={i} model={message} />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Type message here..."
                  onSend={handleSend}
                  disabled={isTyping}
                  className="border-t border-gray-300 text-xl"
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>

        <AlertDialogFooter className="mt-4 flex justify-center">
          <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
    </>
  );
};

export default LandingPage;
