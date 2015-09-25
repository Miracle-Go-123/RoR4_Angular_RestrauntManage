class Reset < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.reset.password_reset.subject
  #
   def password_reset(user)
    @user = user
    mail(to: "<#{user.email}>",
         subject: "Reset Your Password")
   end
end
