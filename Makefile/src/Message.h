#ifndef __MESSAGE_INCLUDED
#define __MESSAGE_INCLUDED

#include <string>
#include <iostream>

class Message
{
public:
  static std::ostream &print(std::ostream &, Message &);
  Message(const std::string &str) : contents(str) {}
private:
  std::string contents;
};

#endif
