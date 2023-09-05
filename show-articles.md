<$set name="a-count" value={{{ [$:/temp/articles/number]get[number](#%24%3A/temp/articles/number%5Dget%5Bnumber) }}}>
{{{ [!is[system]field:publish[article]!sort[modified]limit<a-count>] -[GettingStarted](#GettingStarted)||$:/core/ui/ViewTemplate}}}
</$set>