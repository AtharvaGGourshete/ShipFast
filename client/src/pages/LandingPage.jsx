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

const API_KEY =
  "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";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }
  const { resolvedTheme } = useTheme();
  const [shadowColor, setShadowColor] = useState("white");
  const [date, setDate] = useState(null); // Add this line

  useEffect(() => {
    setShadowColor(resolvedTheme === "dark" ? "white" : "black");
  }, [resolvedTheme]);

  return (
    <>
      {/* Google Font Import */}
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
          <p className="tracking-wide text-xl font-raleway ml-72 mr-72 mt-7">
            ShipFast Logistics ensures fast, reliable global deliveries with
            guaranteed on-time shipping. Trusted by businesses worldwide, we
            prioritize efficiency, precision, and customer satisfaction. Backed
            by successful testimonials, our seamless logistics services make
            shipping hassle-free. Choose ShipFast for speed, reliability, and
            excellence in every delivery.
          </p>
          <div className="flex gap-5 justify-center text-black items-center">
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
          <AlertDialogTrigger asChild className="mb-5">
            <Button variant="outline">Chat with our AI assistant</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-1/2 flex justify-center">
            <div className="App flex justify-center">
              <div
                style={{
                  position: "relative",
                  height: "600px",
                  width: "1000px",
                  zIndex: "30",
                  borderRadius: "50px"
                }}
              >
                <MainContainer className="p-7 rounded-2xl mb-5">
                  <ChatContainer className="">
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={
                        isTyping ? (
                          <TypingIndicator content="AI is typing" />
                        ) : null
                      }
                    >
                      {messages.map((message, i) => {
                        console.log(message);
                        return <Message key={i} model={message} />;
                      })}
                    </MessageList>
                    <MessageInput
                      placeholder="Type message here"
                      onSend={handleSend}
                    />
                    
                  </ChatContainer>
                </MainContainer>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default LandingPage;
