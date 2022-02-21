export function disable()
{
 document.onkeydown = function (e) 
 {
  return false;
 }
};

export function enable()
{
 document.onkeydown = function (e) 
 {
  return true;
 }
}